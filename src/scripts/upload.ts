import { zipSync } from 'fflate';
import { defaultTnefUnwrapper, parse } from 'omnimail';

type RuntimeCopy = {
	problem: string;
	unsupportedTitle: string;
	unsupportedMessage: string;
	tooLargeTitle: string;
	tooLargeMessage: string;
	reading: string;
	searching: string;
	noAttachmentsTitle: string;
	noAttachmentsMessage: string;
	partialOne: string;
	partialMany: string;
	done: string;
	decodeTitle: string;
	decodeMessage: string;
	zipTitle: string;
	zipMessage: string;
	download: string;
	downloadAria: string;
	recoveredOne: string;
	recoveredMany: string;
};

type Attachment = { name: string; mimeType: string; content: Uint8Array; size: number };

const MAX_FILE_SIZE = 150 * 1024 * 1024;
const TNEF_SIGNATURE = 0x223e9f78;
const TNEF_ATTACHMENT_LEVEL = 2;
const TNEF_ATTACH_REND_DATA = 0x9002;
const TNEF_ATTACH_DATA = 0x800f;
const TNEF_ATTACH_TITLE = 0x8010;
const TNEF_ATTACH_MIME_TAG = 0x9013;
const dropzone = document.querySelector<HTMLDivElement>('#dropzone');
const input = document.querySelector<HTMLInputElement>('#file-input');

if (dropzone && input) {
	const runtime = JSON.parse(dropzone.dataset.runtime ?? '{}') as RuntimeCopy;
	const ready = dropzone.dataset.ready ?? '';
	const browseButton = document.querySelector<HTMLButtonElement>('#browse-button');
	const status = document.querySelector<HTMLDivElement>('#tool-status');
	const statusText = document.querySelector<HTMLSpanElement>('#status-text');
	const resultPanel = document.querySelector<HTMLDivElement>('#result-panel');
	const errorPanel = document.querySelector<HTMLDivElement>('#error-panel');
	const errorTitle = document.querySelector<HTMLHeadingElement>('#error-title');
	const errorMessage = document.querySelector<HTMLParagraphElement>('#error-message');
	const list = document.querySelector<HTMLUListElement>('#attachment-list');
	const resultSummary = document.querySelector<HTMLSpanElement>('#result-summary');
	const partialNotice = document.querySelector<HTMLDivElement>('#partial-notice');
	const downloadAll = document.querySelector<HTMLButtonElement>('#download-all');
	const resetButton = document.querySelector<HTMLButtonElement>('#reset-button');
	const retryButton = document.querySelector<HTMLButtonElement>('#retry-button');
	const statusIcon = document.querySelector<HTMLSpanElement>('.status-icon');
	let attachments: Attachment[] = [];
	let objectUrls: string[] = [];
	let dragDepth = 0;

	const formatBytes = (bytes: number) => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	const iconFor = (mimeType: string) => mimeType.includes('image') ? '▧' : mimeType.includes('pdf') ? 'PDF' : 'DOC';
	const isSupportedFile = (file: File) => file.name.toLowerCase().endsWith('.dat') || file.type === 'application/x-tnef';
	const decodeTnefText = (bytes: Uint8Array) => new TextDecoder('windows-1252').decode(bytes).replace(/\0+$/, '').trim();
	const parseRawTnef = (bytes: Uint8Array): Attachment[] => {
		const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
		if (bytes.byteLength < 6 || view.getUint32(0, true) !== TNEF_SIGNATURE) return [];
		const parsed: Attachment[] = [];
		let current: { filename?: string; mimeType?: string; content?: Uint8Array } | undefined;
		let offset = 6;
		while (offset + 9 <= bytes.byteLength) {
			const level = bytes[offset] ?? 0;
			const attribute = view.getUint16(offset + 1, true);
			const length = view.getUint32(offset + 5, true);
			const dataStart = offset + 9;
			const dataEnd = dataStart + length;
			if (dataEnd + 2 > bytes.byteLength) throw new Error('Truncated TNEF record');
			const data = bytes.subarray(dataStart, dataEnd);
			offset = dataEnd + 2;
			if (level !== TNEF_ATTACHMENT_LEVEL) continue;
			if (attribute === TNEF_ATTACH_REND_DATA) {
				if (current?.content) parsed.push({ name: safeName(current.filename ?? '', parsed.length), mimeType: current.mimeType ?? 'application/octet-stream', content: current.content, size: current.content.byteLength });
				current = {};
			} else if (!current) {
				current = {};
			}
			if (attribute === TNEF_ATTACH_DATA) current.content = data.slice();
			else if (attribute === TNEF_ATTACH_TITLE) current.filename = decodeTnefText(data);
			else if (attribute === TNEF_ATTACH_MIME_TAG) current.mimeType = decodeTnefText(data).toLowerCase();
		}
		if (current?.content) parsed.push({ name: safeName(current.filename ?? '', parsed.length), mimeType: current.mimeType ?? 'application/octet-stream', content: current.content, size: current.content.byteLength });
		return parsed;
	};
	const setStatus = (message: string, state = 'idle') => {
		if (statusText) statusText.textContent = message;
		if (status) status.dataset.state = state;
		if (statusIcon) statusIcon.textContent = state === 'error' ? '!' : state === 'busy' ? '…' : '✓';
	};
	const clearUrls = () => { objectUrls.forEach((url) => URL.revokeObjectURL(url)); objectUrls = []; };
	const showError = (title: string, message: string) => {
		if (errorTitle) errorTitle.textContent = title;
		if (errorMessage) errorMessage.textContent = message;
		if (errorPanel) errorPanel.hidden = false;
		if (resultPanel) resultPanel.hidden = true;
		setStatus(runtime.problem, 'error');
	};
	const safeName = (name: string, index: number) => (name.trim() || `attachment-${index + 1}`).replace(/[\\/:*?"<>|]/g, '-');
	const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character] ?? character));
	const renderResults = () => {
		if (!list || !resultSummary || !resultPanel) return;
		clearUrls();
		list.innerHTML = '';
		attachments.forEach((attachment) => {
			const contentBuffer = attachment.content.buffer.slice(attachment.content.byteOffset, attachment.content.byteOffset + attachment.content.byteLength) as ArrayBuffer;
			const url = URL.createObjectURL(new Blob([contentBuffer], { type: attachment.mimeType || 'application/octet-stream' }));
			objectUrls.push(url);
			const item = document.createElement('li');
			item.className = 'attachment-item';
			item.innerHTML = `<span class="attachment-icon" aria-hidden="true">${iconFor(attachment.mimeType)}</span><span class="attachment-meta"><strong>${escapeHtml(attachment.name)}</strong><small>${escapeHtml(attachment.mimeType || 'Unknown type')} · ${formatBytes(attachment.size)}</small></span><a class="download-link" href="${url}" download="${escapeHtml(attachment.name)}" aria-label="${runtime.downloadAria.replace('{name}', escapeHtml(attachment.name))}">${runtime.download} <span aria-hidden="true">↓</span></a>`;
			list.appendChild(item);
		});
		resultSummary.textContent = (attachments.length === 1 ? runtime.recoveredOne : runtime.recoveredMany).replace('{count}', String(attachments.length));
		resultPanel.hidden = false;
		if (errorPanel) errorPanel.hidden = true;
		setStatus(runtime.done, 'success');
	};
	const processFile = async (file: File) => {
		if (resetButton) resetButton.disabled = true;
		if (errorPanel) errorPanel.hidden = true;
		if (resultPanel) resultPanel.hidden = true;
		if (!isSupportedFile(file)) { showError(runtime.unsupportedTitle, runtime.unsupportedMessage); if (resetButton) resetButton.disabled = false; return; }
		if (file.size > MAX_FILE_SIZE) { showError(runtime.tooLargeTitle, runtime.tooLargeMessage); if (resetButton) resetButton.disabled = false; return; }
		try {
			setStatus(runtime.reading, 'busy');
			await new Promise((resolve) => setTimeout(resolve, 120));
			const bytes = new Uint8Array(await file.arrayBuffer());
			setStatus(runtime.searching, 'busy');
			const rawAttachments = parseRawTnef(bytes);
			const parsed = rawAttachments.length ? undefined : parse(bytes, { unwrapTnef: defaultTnefUnwrapper });
			attachments = rawAttachments.length ? rawAttachments : (parsed?.attachments ?? []).filter((attachment) => attachment.content?.byteLength).map((attachment, index) => ({ name: safeName(attachment.filename || '', index), mimeType: attachment.mimeType, content: attachment.content, size: attachment.size || attachment.content.byteLength }));
			const failedAttachments = parsed ? parsed.attachments.length - attachments.length : 0;
			if (!attachments.length) { showError(runtime.noAttachmentsTitle, runtime.noAttachmentsMessage); return; }
			if (partialNotice) {
				partialNotice.hidden = failedAttachments === 0;
				partialNotice.textContent = failedAttachments > 0 ? (failedAttachments === 1 ? runtime.partialOne : runtime.partialMany).replace('{count}', String(failedAttachments)) : '';
			}
			renderResults();
		} catch (error) {
			console.error(error);
			showError(runtime.decodeTitle, runtime.decodeMessage);
		} finally {
			if (resetButton) resetButton.disabled = false;
		}
	};
	const reset = () => {
		clearUrls();
		attachments = [];
		input.value = '';
		if (resultPanel) resultPanel.hidden = true;
		if (errorPanel) errorPanel.hidden = true;
		if (partialNotice) partialNotice.hidden = true;
		setStatus(ready, 'idle');
	};
	const downloadZip = () => {
		if (!attachments.length) return;
		try {
			const files: Record<string, Uint8Array> = {};
			attachments.forEach((attachment, index) => { files[`${String(index + 1).padStart(2, '0')}-${attachment.name}`] = attachment.content; });
			const zip = zipSync(files, { level: 6 });
			const url = URL.createObjectURL(new Blob([zip], { type: 'application/zip' }));
			const link = document.createElement('a');
			link.href = url;
			link.download = 'winmail-attachments.zip';
			link.click();
			setTimeout(() => URL.revokeObjectURL(url), 1000);
		} catch (error) {
			console.error(error);
			showError(runtime.zipTitle, runtime.zipMessage);
		}
	};
	const openPicker = () => input.click();

	dropzone.addEventListener('click', (event) => { if (!(event.target as HTMLElement).closest('button')) openPicker(); });
	dropzone.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPicker(); }
	});
	browseButton?.addEventListener('click', (event) => { event.stopPropagation(); openPicker(); });
	input.addEventListener('change', () => { const file = input.files?.[0]; if (file) void processFile(file); });
	dropzone.addEventListener('dragenter', (event) => { event.preventDefault(); dragDepth += 1; dropzone.dataset.dragging = 'true'; });
	dropzone.addEventListener('dragover', (event) => { event.preventDefault(); if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy'; });
	dropzone.addEventListener('dragleave', (event) => { event.preventDefault(); dragDepth = Math.max(0, dragDepth - 1); if (!dragDepth) dropzone.dataset.dragging = 'false'; });
	dropzone.addEventListener('drop', (event) => {
		event.preventDefault();
		dragDepth = 0;
		dropzone.dataset.dragging = 'false';
		const file = event.dataTransfer?.files[0];
		if (file) void processFile(file);
	});
	downloadAll?.addEventListener('click', downloadZip);
	resetButton?.addEventListener('click', reset);
	retryButton?.addEventListener('click', reset);
}
