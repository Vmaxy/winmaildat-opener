export const locales = ['en', 'de', 'es', 'ja'] as const;
export type Locale = (typeof locales)[number];
export type PageKey = 'home' | 'faq' | 'how-it-works' | 'privacy' | 'about' | 'terms' | 'contact';

export const localeLabels: Record<Locale, string> = {
	en: 'English',
	de: 'Deutsch',
	es: 'Español',
	ja: '日本語',
};

export const localeNames: Record<Locale, string> = {
	en: 'English',
	de: 'Deutsch',
	es: 'español',
	ja: '日本語',
};

export const isLocale = (value: string | undefined): value is Locale =>
	!!value && locales.includes(value as Locale);

export const localeFromPath = (pathname: string): Locale => {
	const segment = pathname.split('/').filter(Boolean)[0];
	return isLocale(segment) ? segment : 'en';
};

export const pageFromPath = (pathname: string): PageKey => {
	const segments = pathname.split('/').filter(Boolean);
	const first = isLocale(segments[0]) ? segments[1] : segments[0];
	return first === 'faq' || first === 'how-it-works' || first === 'privacy' || first === 'about' || first === 'terms' || first === 'contact'
		? first
		: 'home';
};

export const localizedPath = (locale: Locale, page: PageKey): string => {
	const suffix = page === 'home' ? '' : `/${page}`;
	return locale === 'en' ? `${suffix || '/'}` : `/${locale}${suffix || '/'}`;
};

type Translation = {
	siteTitle: string;
	siteDescription: string;
	home: {
		navHow: string;
		navFaq: string;
		openFile: string;
		heroEyebrow: string;
		heroTitleBefore: string;
		heroTitleAfter: string;
		heroLead: string;
		toolEyebrow: string;
		toolTitle: string;
		quick: string;
		dropTitle: string;
		browseLead: string;
		browse: string;
		fileHint: string;
		ready: string;
		recoveredEyebrow: string;
		filesReady: string;
		downloadAll: string;
		openAnother: string;
		errorTitle: string;
		errorMessage: string;
		tryAgain: string;
		privacyNote: string;
		readPrivacy: string;
		proofEyebrow: string;
		proofTitle: string;
		proof: Array<{ title: string; body: string }>;
		howEyebrow: string;
		howTitle: string;
		steps: Array<{ title: string; body: string }>;
		faqEyebrow: string;
		faqTitle: string;
		faq: Array<{ question: string; answer: string }>;
		runtime: {
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
	};
	pages: {
		faq: { eyebrow: string; title: string; lead: string; items: Array<{ question: string; answer: string }> };
		how: { eyebrow: string; title: string; lead: string; steps: Array<{ title: string; body: string }>; calloutEyebrow: string; calloutTitle: string; calloutBody: string };
		privacy: { eyebrow: string; title: string; lead: string; sections: Array<{ title: string; body: string }>; contactLink: string };
		about: { eyebrow: string; title: string; lead: string; sections: Array<{ title: string; body: string }> };
		terms: { eyebrow: string; title: string; lead: string; sections: Array<{ title: string; body: string }>; contactLink: string };
		contact: { eyebrow: string; title: string; lead: string; calloutEyebrow: string; calloutBody: string; calloutNote: string };
	};
	shared: {
		homeAria: string;
		mainNav: string;
		privacy: string;
		about: string;
		terms: string;
		contact: string;
		free: string;
		localeMenu: string;
		selectLanguage: string;
		menuButton: string;
		mobileMenu: string;
	};
};

const en: Translation = {
	siteTitle: 'Winmail.dat Opener — Free Online Viewer',
	siteDescription: 'Open and view winmail.dat files online for free. Recover email attachments privately in your browser on Mac, Windows, or phone.',
	home: {
		navHow: 'How it works', navFaq: 'FAQ', openFile: 'Open a file', heroEyebrow: 'A private file utility',
		heroTitleBefore: 'Extract the files hiding inside', heroTitleAfter: '.', heroLead: 'Drop in the attachment you could not open. We extract it right in your browser and give you the files back — no upload, no account, no waiting.',
		toolEyebrow: 'Local decoder', toolTitle: 'Open your file', quick: 'Quick & Easy', dropTitle: 'Drop your winmail.dat or ATT0001.dat here', browseLead: 'or', browse: 'browse your files', fileHint: 'DAT files up to 150 MB', ready: 'Ready when you are.',
		recoveredEyebrow: 'Recovered attachments', filesReady: 'Your files are ready', downloadAll: 'Download all', openAnother: 'Open another file', errorTitle: 'We could not open that file.', errorMessage: 'Try a different winmail.dat file, or check the troubleshooting guide.', tryAgain: 'Try again',
		privacyNote: 'Your file is read locally by this page.', readPrivacy: 'Read our privacy note.', proofEyebrow: 'Why use this one', proofTitle: 'Simple when the attachment is not.',
		proof: [
			{ title: 'Private by default', body: 'File bytes stay in your browser from start to finish.' },
			{ title: 'Clear recovery', body: 'See every attachment, its size, and what is ready to download.' },
			{ title: 'Works anywhere', body: 'Designed for a quick fix on a laptop, tablet, or phone.' },
		],
		howEyebrow: 'How it works', howTitle: 'Three small steps to your real attachments.',
		steps: [
			{ title: 'Choose the file', body: 'Find the winmail.dat attachment from your email and drop it above.' },
			{ title: 'We decode locally', body: 'The TNEF container is unpacked in your browser. Nothing is uploaded.' },
			{ title: 'Download what you need', body: 'Save attachments one at a time or collect everything in one ZIP.' },
		],
		faqEyebrow: 'Questions, answered', faqTitle: 'A little less mystery around that .dat file.',
		faq: [
			{ question: 'What is a winmail.dat opener?', answer: 'A winmail.dat opener is a tool that reads the TNEF container created by Microsoft Outlook and extracts the real attachments inside it. This opener works in your browser and processes the selected file locally.' },
			{ question: 'How to open winmail.dat?', answer: 'Save the winmail.dat attachment from your email, choose it in the opener above, and wait while the browser finds the recoverable files. You can then download each attachment or download them together as a ZIP.' },
			{ question: 'How can I open a winmail.dat file?', answer: 'Use a TNEF-compatible viewer such as Winmail.dat Opener. Select the original winmail.dat or ATT0001.dat file, and the tool will show the PDFs, images, documents, or other attachments that can be recovered.' },
			{ question: 'How can I convert a Winmail.dat file to PDF?', answer: 'A winmail.dat file is an attachment container, not usually a PDF. Open it first to recover the files inside. If one recovered attachment is a document that supports PDF export, open that attachment in a compatible app and save or print it as a PDF.' },
			{ question: 'Which program can open .dat files?', answer: 'The right program depends on what created the .dat file. For a winmail.dat or ATT0001.dat email attachment, use a TNEF decoder. Other .dat files may belong to a specific application and should be opened only with software that supports their format.' },
			{ question: "Why can't I open Winmail?", answer: 'You may be trying to open a TNEF attachment with an app that does not understand it, or the file may be incomplete. Try the original download, confirm it is a winmail.dat or ATT0001.dat file under 150 MB, and open it with a TNEF decoder.' },
			{ question: 'How can I open a .dat file online?', answer: 'For a winmail.dat email attachment, save the file and choose it in this online opener. The decoder reads supported TNEF files in your browser, so the attachment contents are not uploaded to a server.' },
			{ question: 'How do I convert a dat file to a readable format?', answer: 'First identify the format that created the .dat file. If it is winmail.dat, decode the TNEF container to recover its original attachments. Generic .dat files are not one universal format, so they cannot safely be converted without knowing their source.' },
			{ question: 'How to open a .dat file in Windows 11?', answer: 'If the file came from an Outlook email and is named winmail.dat or ATT0001.dat, save it and open it with this browser-based TNEF decoder on Windows 11. For another .dat format, use the Windows program associated with the app that created it.' },
		],
		runtime: {
			problem: 'There is a problem to fix.', unsupportedTitle: 'That does not look like a TNEF file.', unsupportedMessage: 'Choose a winmail.dat or ATT0001.dat attachment from your email, then try again.',
			tooLargeTitle: 'That file is larger than 150 MB.', tooLargeMessage: 'For privacy and performance, this browser tool accepts files up to 150 MB.', reading: 'Reading your file locally…', searching: 'Looking for attachments…',
			noAttachmentsTitle: 'No attachments were found.', noAttachmentsMessage: 'This file may only contain email formatting, fonts, or pasted inline images. If you expected a file, download the original attachment again and retry.',
			partialOne: '1 attachment could not be recovered. The files below are ready to download.',
			partialMany: '{count} attachments could not be recovered. The files below are ready to download.',
			done: 'Done. Your files are ready.', decodeTitle: 'We could not decode that file.', decodeMessage: 'Try downloading the attachment again. If the problem continues, the file may be incomplete or use an unsupported format.',
			zipTitle: 'The ZIP could not be created.', zipMessage: 'Download the files individually instead, then try again.', download: 'Download', downloadAria: 'Download {name}', recoveredOne: '1 file recovered', recoveredMany: '{count} files recovered',
		},
	},
	pages: {
		faq: { eyebrow: 'FAQ', title: 'Answers before you start.', lead: 'A few practical notes about Outlook’s winmail.dat files and this browser-based decoder.', items: [
			{ question: 'Why did I receive a winmail.dat file?', answer: 'Microsoft Outlook can package rich-text formatting, calendar details, and attachments using Transport Neutral Encapsulation Format (TNEF). Mail apps that do not understand TNEF often show the package as winmail.dat.' },
			{ question: 'Does this support ATT0001.dat?', answer: 'Yes. ATT0001.dat is another filename commonly used for a TNEF attachment. Select or drop it into the decoder just like winmail.dat.' },
			{ question: 'Is my file uploaded?', answer: 'No. The selected file is read and decoded in your browser. The application does not need to upload the file contents to recover the attachments.' },
			{ question: 'What file size can I use?', answer: 'The decoder accepts DAT files up to 150 MB. This keeps local processing responsive and limits memory pressure on phones and older devices.' },
			{ question: 'Why did the tool find no attachments?', answer: 'The file may be incomplete, may only contain formatting metadata, or may not actually be a TNEF container. Downloading the original attachment again is the best first retry.' },
			{ question: 'Can I download everything together?', answer: 'Yes. After a successful decode, choose Download all to create a ZIP in your browser. Individual download links are also available for each recovered file.' },
		] },
		how: { eyebrow: 'How it works', title: 'What happens to your file.', lead: 'Winmail.dat Opener is a small browser utility for one specific email problem: getting the real attachments back out of a TNEF container, whether it is named winmail.dat or ATT0001.dat.', steps: [
			{ title: 'You choose a file', body: 'Use the picker or drop a `.dat` attachment onto the opener. Files are checked for type and size before processing.' },
			{ title: 'Your browser reads it', body: 'The file is read with browser APIs and decoded in memory using a TNEF parser. There is no upload request for the file bytes.' },
			{ title: 'You save the results', body: 'Recovered attachments become local download links. You can save one file or create a ZIP directly on your device.' },
		], calloutEyebrow: 'Privacy note', calloutTitle: 'Your file does not need to leave your device.', calloutBody: 'Like any browser tool, this page still needs to load its code and assets. The selected file itself is processed locally; it is not sent to Winmail.dat Opener or another service.' },
		privacy: { eyebrow: 'Privacy', title: 'Your file stays with you.', lead: 'This page explains what happens when you use the decoder and what this site does not need to collect.', sections: [
			{ title: 'Local file processing', body: 'When you choose a file, this website reads it with browser APIs and decodes it in your device’s memory. The selected file is not uploaded to Winmail.dat Opener, and there is no server-side file retention or download area.' },
			{ title: 'What the site can still receive', body: 'As with any website, your browser may request the page, scripts, styles, and static assets needed to display it. Your hosting provider may receive ordinary web request information such as an IP address, timestamp, and user agent. The decoder does not need the contents of your selected file to provide the download results.' },
			{ title: 'Temporary browser data', body: 'Recovered files are represented by temporary browser object URLs so you can download them. Those URLs are revoked when you reset the tool or leave the page. The page does not intentionally save recovered files to a cloud account.' },
			{ title: 'Third-party services', body: 'The first release is designed without advertising pixels, analytics scripts, or third-party upload services. If that changes, this page should be updated before those services are enabled.' },
			{ title: 'Questions', body: 'If you have a privacy or recovery question, use the contact page. Please do not email confidential files unless you have independently decided that sharing them is safe.' },
		], contactLink: 'contact page' },
		about: { eyebrow: 'About us', title: 'A small tool for an annoying email problem.', lead: 'Winmail.dat Opener exists to make one frustrating file format easier to understand and safer to handle.', sections: [
			{ title: 'Why this exists', body: 'Some email clients package rich-text formatting and attachments inside a TNEF container named winmail.dat. When your mail app cannot read that container, a useful attachment can look like an unreadable .dat file.' },
			{ title: 'What we built', body: 'This site is a focused browser utility: choose the file, decode it locally, and save the attachments you need. It is intentionally small, clear, and free to use.' },
			{ title: 'Privacy by design', body: 'The decoder processes the selected file in your browser instead of requiring a file upload or account. That keeps the workflow quick and gives you a clearer boundary around your data.' },
			{ title: 'Keep in touch', body: 'If the tool helped or you found a file it cannot open, we welcome practical feedback. The contact page explains what details are useful and how to reach us.' },
		] },
		terms: { eyebrow: 'Terms & conditions', title: 'Simple terms for a simple tool.', lead: 'These terms describe the basic rules for using Winmail.dat Opener.', sections: [
			{ title: 'Use of the service', body: 'You may use this free tool to inspect winmail.dat and ATT0001.dat files that you are authorized to access. Do not use it to process files or information you have no right to handle.' },
			{ title: 'No guarantee of recovery', body: 'The decoder is provided as-is. It may not recover every attachment, especially when a file is incomplete, malformed, encrypted, or uses an unsupported variation of TNEF.' },
			{ title: 'Your responsibility', body: 'You are responsible for the files you select, the attachments you download, and how you use the recovered content. Keep backups of important files and scan downloads according to your normal security practices.' },
			{ title: 'Availability and changes', body: 'We may improve, change, suspend, or discontinue parts of the service without notice. We may also update these terms when the service changes.' },
			{ title: 'Questions', body: 'If you have a question about these terms or the service, use the contact page.' },
		], contactLink: 'contact page' },
		contact: { eyebrow: 'Contact', title: 'Tell us what got stuck.', lead: 'Feedback helps improve the decoder. Please describe the browser, file size, and error message you saw. Never attach a confidential file unless you are comfortable sharing it.', calloutEyebrow: 'Feedback by email', calloutBody: 'Include the steps that led to the problem and whether the file was named winmail.dat or ATT0001.dat. We cannot recover a file without seeing it, but we can help identify the next safe step.', calloutNote: 'Contact us by email' },
	},
	shared: { homeAria: 'Winmail.dat Opener home', mainNav: 'Main navigation', privacy: 'Privacy', about: 'About us', terms: 'Terms', contact: 'Contact', free: 'Free to use.', localeMenu: 'Language', selectLanguage: 'Select language', menuButton: 'Open navigation menu', mobileMenu: 'Mobile navigation' },
};

type TranslationOverrides = {
	siteTitle?: string;
	siteDescription?: string;
	home?: Partial<Omit<Translation['home'], 'runtime'>> & { runtime?: Partial<Translation['home']['runtime']> };
	pages?: Partial<Translation['pages']>;
	shared?: Partial<Translation['shared']>;
};

const translated = (base: Translation, overrides: TranslationOverrides): Translation => ({
	...base,
	...overrides,
	home: { ...base.home, ...overrides.home, runtime: { ...base.home.runtime, ...overrides.home?.runtime } },
	pages: { ...base.pages, ...overrides.pages },
	shared: { ...base.shared, ...overrides.shared },
});

export const translations: Record<Locale, Translation> = {
	en,
	de: translated(en, {
		siteTitle: 'Winmail.dat Opener — E-Mail-Anhänge privat wiederherstellen',
		siteDescription: 'Öffne winmail.dat-Dateien im Browser und lade die enthaltenen Anhänge herunter. Deine Dateien bleiben auf deinem Gerät.',
		home: {
			navHow: 'So funktioniert es', navFaq: 'FAQ', openFile: 'Datei öffnen', heroEyebrow: 'Privates Dateiwerkzeug', heroTitleBefore: 'Dateien aus', heroTitleAfter: ' extrahieren.', heroLead: 'Ziehe den Anhang hierher, den du nicht öffnen konntest. Wir extrahieren ihn direkt im Browser — ohne Upload, Konto oder Wartezeit.',
			toolEyebrow: 'Lokaler Decoder', toolTitle: 'Datei öffnen', quick: 'Schnell & einfach', dropTitle: 'winmail.dat oder ATT0001.dat hier ablegen', browseLead: 'oder', browse: 'Dateien durchsuchen', fileHint: 'DAT-Dateien bis 150 MB', ready: 'Bereit, wenn du es bist.', recoveredEyebrow: 'Wiederhergestellte Anhänge', filesReady: 'Deine Dateien sind bereit', downloadAll: 'Alle herunterladen', openAnother: 'Weitere Datei öffnen', errorTitle: 'Diese Datei konnte nicht geöffnet werden.', errorMessage: 'Versuche eine andere winmail.dat-Datei oder öffne die Anleitung zur Fehlerbehebung.', tryAgain: 'Erneut versuchen', privacyNote: 'Deine Datei wird lokal auf dieser Seite gelesen.', readPrivacy: 'Datenschutzhinweis lesen.', proofEyebrow: 'Warum dieses Tool', proofTitle: 'Einfach, wenn der Anhang es nicht ist.', proof: [{ title: 'Privat voreingestellt', body: 'Die Dateidaten bleiben von Anfang bis Ende in deinem Browser.' }, { title: 'Klare Wiederherstellung', body: 'Sieh jeden Anhang, seine Größe und was zum Download bereit ist.' }, { title: 'Überall nutzbar', body: 'Für eine schnelle Lösung auf Laptop, Tablet oder Smartphone.' }], howEyebrow: 'So funktioniert es', howTitle: 'Drei kleine Schritte zu deinen echten Anhängen.', steps: [{ title: 'Datei auswählen', body: 'Finde den winmail.dat-Anhang in deiner E-Mail und lege ihn oben ab.' }, { title: 'Lokal dekodieren', body: 'Der TNEF-Container wird im Browser entpackt. Nichts wird hochgeladen.' }, { title: 'Benötigtes herunterladen', body: 'Speichere Anhänge einzeln oder sammle alles in einer ZIP-Datei.' }], faqEyebrow: 'Fragen und Antworten', faqTitle: 'Weniger Rätsel um die .dat-Datei.', faq: [{ question: 'Was ist eine winmail.dat-Datei?', answer: 'Outlook kann Rich-Text-Formatierungen und Anhänge in einem TNEF-Container namens winmail.dat verpacken. Andere Mailprogramme zeigen dann möglicherweise den Container statt der Dateien an.' }, { question: 'Wird meine Datei hochgeladen?', answer: 'Nein. Der Decoder liest die Datei mit Browser-APIs auf deinem Gerät. Die Dateiinhalte werden nicht an unseren Server oder einen Drittanbieter gesendet.' }, { question: 'Was passiert bei einem Fehler?', answer: 'Vergewissere dich, dass du den ursprünglichen .dat-Anhang ausgewählt hast und er kleiner als 150 MB ist.' }, { question: 'Kann ich das auf dem Smartphone verwenden?', answer: 'Ja. Nutze die Dateiauswahl in deiner Mail- oder Dateien-App.' }], runtime: { problem: 'Es gibt ein Problem zu beheben.', unsupportedTitle: 'Das sieht nicht nach einer TNEF-Datei aus.', unsupportedMessage: 'Wähle einen winmail.dat- oder ATT0001.dat-Anhang und versuche es erneut.', tooLargeTitle: 'Die Datei ist größer als 150 MB.', tooLargeMessage: 'Aus Datenschutz- und Performancegründen werden nur Dateien bis 150 MB akzeptiert.', reading: 'Datei wird lokal gelesen…', searching: 'Anhänge werden gesucht…', noAttachmentsTitle: 'Keine Anhänge gefunden.', noAttachmentsMessage: 'Diese Datei enthält möglicherweise nur Formatierungen oder eingebettete Bilder.', partialOne: '1 Anhang konnte nicht wiederhergestellt werden. Die folgenden Dateien sind bereit.', partialMany: '{count} Anhänge konnten nicht wiederhergestellt werden. Die folgenden Dateien sind bereit.', done: 'Fertig. Deine Dateien sind bereit.', decodeTitle: 'Diese Datei konnte nicht dekodiert werden.', decodeMessage: 'Lade den Anhang erneut herunter und versuche es noch einmal.', zipTitle: 'Die ZIP-Datei konnte nicht erstellt werden.', zipMessage: 'Lade die Dateien einzeln herunter.', download: 'Herunterladen', downloadAria: '{name} herunterladen', recoveredOne: '1 Datei wiederhergestellt', recoveredMany: '{count} Dateien wiederhergestellt' } },
		shared: { homeAria: 'Winmail.dat Opener Startseite', mainNav: 'Hauptnavigation', privacy: 'Datenschutz', contact: 'Kontakt', free: 'Kostenlos nutzbar.', localeMenu: 'Sprache', selectLanguage: 'Sprache auswählen', menuButton: 'Navigationsmenü öffnen', mobileMenu: 'Mobile Navigation' },
		pages: {
			faq: { eyebrow: 'FAQ', title: 'Antworten vor dem Start.', lead: 'Praktische Hinweise zu Outlook-winmail.dat-Dateien und diesem browserbasierten Decoder.', items: [{ question: 'Warum habe ich eine winmail.dat-Datei erhalten?', answer: 'Microsoft Outlook kann Formatierungen, Kalenderdetails und Anhänge mit TNEF verpacken. Mailprogramme ohne TNEF-Unterstützung zeigen das Paket oft als winmail.dat.' }, { question: 'Wird ATT0001.dat unterstützt?', answer: 'Ja. ATT0001.dat ist ein weiterer häufiger Dateiname für einen TNEF-Anhang.' }, { question: 'Wird meine Datei hochgeladen?', answer: 'Nein. Die Datei wird in deinem Browser gelesen und dekodiert.' }, { question: 'Welche Dateigröße ist möglich?', answer: 'Der Decoder akzeptiert DAT-Dateien bis 150 MB.' }, { question: 'Warum wurden keine Anhänge gefunden?', answer: 'Die Datei ist möglicherweise unvollständig oder enthält nur Formatierungsdaten.' }, { question: 'Kann ich alles zusammen herunterladen?', answer: 'Ja. Nach erfolgreicher Dekodierung erstellt Alle herunterladen eine ZIP-Datei in deinem Browser.' }] },
			how: { eyebrow: 'So funktioniert es', title: 'Was mit deiner Datei passiert.', lead: 'Winmail.dat Opener ist ein kleines Browserwerkzeug für ein konkretes E-Mail-Problem: echte Anhänge aus einem TNEF-Container zurückzubekommen.', steps: [{ title: 'Du wählst eine Datei', body: 'Nutze die Dateiauswahl oder lege einen `.dat`-Anhang auf dem Opener ab.' }, { title: 'Dein Browser liest sie', body: 'Die Datei wird mit Browser-APIs gelesen und im Speicher dekodiert.' }, { title: 'Du speicherst die Ergebnisse', body: 'Wiederhergestellte Anhänge werden zu lokalen Download-Links.' }], calloutEyebrow: 'Datenschutzhinweis', calloutTitle: 'Deine Datei muss dein Gerät nicht verlassen.', calloutBody: 'Die ausgewählte Datei wird lokal verarbeitet und nicht an Winmail.dat Opener oder einen anderen Dienst gesendet.' },
			privacy: { eyebrow: 'Datenschutz', title: 'Deine Datei bleibt bei dir.', lead: 'Hier erklären wir, was beim Decoder passiert und welche Daten diese Seite nicht erheben muss.', sections: [{ title: 'Lokale Dateiverarbeitung', body: 'Die ausgewählte Datei wird mit Browser-APIs im Speicher deines Geräts gelesen und dekodiert. Sie wird nicht hochgeladen.' }, { title: 'Was die Website dennoch empfangen kann', body: 'Wie jede Website kann dein Browser Seiten, Skripte, Styles und statische Assets anfordern. Der Inhalt deiner Datei ist für die Ergebnisse nicht erforderlich.' }, { title: 'Temporäre Browserdaten', body: 'Wiederhergestellte Dateien werden über temporäre Objekt-URLs dargestellt, die beim Zurücksetzen oder Verlassen der Seite widerrufen werden.' }, { title: 'Drittanbieterdienste', body: 'Die erste Version ist ohne Werbepixel, Analytics-Skripte oder Upload-Dienste von Drittanbietern konzipiert.' }, { title: 'Fragen', body: 'Bei Fragen zum Datenschutz oder zur Wiederherstellung nutze die Kontaktseite.' }], contactLink: 'Kontaktseite' },
			contact: { eyebrow: 'Kontakt', title: 'Sag uns, was stecken geblieben ist.', lead: 'Feedback hilft, den Decoder zu verbessern. Beschreibe Browser, Dateigröße und Fehlermeldung.', calloutEyebrow: 'Feedback per E-Mail', calloutBody: 'Nenne die Schritte, die zum Problem geführt haben, und ob die Datei winmail.dat oder ATT0001.dat hieß.', calloutNote: 'Per E-Mail kontaktieren' },
		},
	}),
	es: translated(en, {
		siteTitle: 'Winmail.dat Opener — Recupera archivos adjuntos de forma privada',
		siteDescription: 'Abre archivos winmail.dat en tu navegador y descarga sus adjuntos. Tus archivos permanecen en tu dispositivo.',
		home: {
			navHow: 'Cómo funciona', navFaq: 'Preguntas', openFile: 'Abrir archivo', heroEyebrow: 'Una herramienta privada', heroTitleBefore: 'Extrae los archivos ocultos en', heroTitleAfter: '.', heroLead: 'Añade el archivo adjunto que no pudiste abrir. Lo extraemos directamente en tu navegador, sin subirlo, sin cuenta y sin esperas.',
			toolEyebrow: 'Decodificador local', toolTitle: 'Abre tu archivo', quick: 'Rápido y fácil', dropTitle: 'Suelta aquí winmail.dat o ATT0001.dat', browseLead: 'o', browse: 'buscar tus archivos', fileHint: 'Archivos DAT de hasta 150 MB', ready: 'Listo cuando quieras.', recoveredEyebrow: 'Archivos adjuntos recuperados', filesReady: 'Tus archivos están listos', downloadAll: 'Descargar todo', openAnother: 'Abrir otro archivo', errorTitle: 'No pudimos abrir ese archivo.', errorMessage: 'Prueba con otro archivo winmail.dat o consulta la guía de solución de problemas.', tryAgain: 'Intentar de nuevo', privacyNote: 'Esta página lee tu archivo localmente.', readPrivacy: 'Leer nuestra nota de privacidad.', proofEyebrow: 'Por qué usarlo', proofTitle: 'Simple cuando el archivo adjunto no lo es.', proof: [{ title: 'Privado por defecto', body: 'Los datos permanecen en tu navegador de principio a fin.' }, { title: 'Recuperación clara', body: 'Consulta cada archivo, su tamaño y lo que está listo para descargar.' }, { title: 'Funciona en cualquier lugar', body: 'Diseñado para una solución rápida en ordenador, tableta o móvil.' }], howEyebrow: 'Cómo funciona', howTitle: 'Tres pasos para recuperar tus archivos.', steps: [{ title: 'Elige el archivo', body: 'Busca el adjunto winmail.dat de tu correo y suéltalo arriba.' }, { title: 'Lo decodificamos localmente', body: 'El contenedor TNEF se descomprime en tu navegador. No se sube nada.' }, { title: 'Descarga lo que necesites', body: 'Guarda los adjuntos uno a uno o crea un ZIP.' }], faqEyebrow: 'Preguntas respondidas', faqTitle: 'Un poco menos de misterio sobre ese archivo .dat.', faq: [{ question: '¿Qué es un archivo winmail.dat?', answer: 'Outlook puede empaquetar el formato y los adjuntos de un correo en un contenedor TNEF llamado winmail.dat.' }, { question: '¿Se sube mi archivo?', answer: 'No. El decodificador lo lee con las APIs del navegador en tu dispositivo.' }, { question: '¿Qué hago si aparece un error?', answer: 'Comprueba que seleccionaste el adjunto .dat original y que mide menos de 150 MB.' }, { question: '¿Puedo usarlo en mi móvil?', answer: 'Sí. Usa el selector de archivos de tu aplicación de correo o archivos.' }], runtime: { problem: 'Hay un problema que resolver.', unsupportedTitle: 'Ese archivo no parece TNEF.', unsupportedMessage: 'Elige un adjunto winmail.dat o ATT0001.dat e inténtalo de nuevo.', tooLargeTitle: 'El archivo supera los 150 MB.', tooLargeMessage: 'Por privacidad y rendimiento, solo aceptamos archivos de hasta 150 MB.', reading: 'Leyendo tu archivo localmente…', searching: 'Buscando archivos adjuntos…', noAttachmentsTitle: 'No se encontraron archivos adjuntos.', noAttachmentsMessage: 'El archivo puede contener solo formato o imágenes integradas.', partialOne: 'No se pudo recuperar 1 archivo adjunto. Los siguientes están listos.', partialMany: 'No se pudieron recuperar {count} archivos adjuntos. Los siguientes están listos.', done: 'Listo. Tus archivos están preparados.', decodeTitle: 'No pudimos decodificar ese archivo.', decodeMessage: 'Vuelve a descargar el adjunto e inténtalo de nuevo.', zipTitle: 'No se pudo crear el ZIP.', zipMessage: 'Descarga los archivos individualmente.', download: 'Descargar', downloadAria: 'Descargar {name}', recoveredOne: '1 archivo recuperado', recoveredMany: '{count} archivos recuperados' } },
		shared: { homeAria: 'Inicio de Winmail.dat Opener', mainNav: 'Navegación principal', privacy: 'Privacidad', contact: 'Contacto', free: 'Gratis.', localeMenu: 'Idioma', selectLanguage: 'Seleccionar idioma', menuButton: 'Abrir menú de navegación', mobileMenu: 'Navegación móvil' },
		pages: {
			faq: { eyebrow: 'Preguntas', title: 'Respuestas antes de empezar.', lead: 'Algunas notas prácticas sobre los archivos winmail.dat de Outlook y este decodificador.', items: [{ question: '¿Por qué recibí un archivo winmail.dat?', answer: 'Outlook puede empaquetar formato, detalles del calendario y adjuntos mediante TNEF.' }, { question: '¿Es compatible con ATT0001.dat?', answer: 'Sí. ATT0001.dat es otro nombre común para un adjunto TNEF.' }, { question: '¿Se sube mi archivo?', answer: 'No. Se lee y decodifica en tu navegador.' }, { question: '¿Qué tamaño puedo usar?', answer: 'El decodificador acepta archivos DAT de hasta 150 MB.' }, { question: '¿Por qué no encontró adjuntos?', answer: 'El archivo puede estar incompleto o contener solo metadatos de formato.' }, { question: '¿Puedo descargarlo todo junto?', answer: 'Sí. Descarga todo crea un ZIP en tu navegador.' }] },
			how: { eyebrow: 'Cómo funciona', title: 'Qué ocurre con tu archivo.', lead: 'Winmail.dat Opener es una herramienta de navegador para recuperar adjuntos reales de un contenedor TNEF.', steps: [{ title: 'Eliges un archivo', body: 'Usa el selector o suelta un adjunto `.dat` en el abridor.' }, { title: 'Tu navegador lo lee', body: 'El archivo se lee con APIs del navegador y se decodifica en memoria.' }, { title: 'Guardas los resultados', body: 'Los adjuntos recuperados se convierten en enlaces de descarga locales.' }], calloutEyebrow: 'Nota de privacidad', calloutTitle: 'Tu archivo no tiene que salir de tu dispositivo.', calloutBody: 'El archivo seleccionado se procesa localmente y no se envía a Winmail.dat Opener ni a otro servicio.' },
			privacy: { eyebrow: 'Privacidad', title: 'Tu archivo se queda contigo.', lead: 'Esta página explica qué ocurre al usar el decodificador y qué no necesitamos recopilar.', sections: [{ title: 'Procesamiento local', body: 'El sitio lee y decodifica el archivo en la memoria de tu dispositivo. No se sube.' }, { title: 'Lo que el sitio puede recibir', body: 'Tu navegador puede solicitar la página, scripts, estilos y recursos estáticos necesarios. El contenido del archivo no es necesario.' }, { title: 'Datos temporales del navegador', body: 'Los archivos recuperados usan URLs temporales que se revocan al reiniciar la herramienta o salir de la página.' }, { title: 'Servicios de terceros', body: 'La primera versión no usa píxeles publicitarios, analítica ni servicios de subida de terceros.' }, { title: 'Preguntas', body: 'Para preguntas sobre privacidad o recuperación, usa la página de contacto.' }], contactLink: 'página de contacto' },
			contact: { eyebrow: 'Contacto', title: 'Cuéntanos qué se atascó.', lead: 'Tus comentarios ayudan a mejorar el decodificador. Describe el navegador, el tamaño y el mensaje de error.', calloutEyebrow: 'Comentarios por correo', calloutBody: 'Incluye los pasos que causaron el problema y si el archivo se llamaba winmail.dat o ATT0001.dat.', calloutNote: 'Contactar por correo' },
		},
	}),
	ja: translated(en, {
		siteTitle: 'Winmail.dat Opener — メール添付ファイルを安全に復元',
		siteDescription: 'ブラウザで winmail.dat を開き、中の添付ファイルをダウンロードできます。ファイルは端末内に留まります。',
		home: {
			navHow: '使い方', navFaq: 'FAQ', openFile: 'ファイルを開く', heroEyebrow: 'プライベートなファイルツール', heroTitleBefore: 'winmail.dat に隠れたファイルを', heroTitleAfter: '取り出す。', heroLead: '開けなかった添付ファイルを追加してください。ブラウザ内で展開するため、アップロードもアカウントも待ち時間も不要です。',
			toolEyebrow: 'ローカルデコーダー', toolTitle: 'ファイルを開く', quick: 'すばやく簡単', dropTitle: 'winmail.dat または ATT0001.dat をここにドロップ', browseLead: 'または', browse: 'ファイルを参照', fileHint: '最大 150 MB の DAT ファイル', ready: '準備ができました。', recoveredEyebrow: '復元された添付ファイル', filesReady: 'ファイルをダウンロードできます', downloadAll: 'すべてダウンロード', openAnother: '別のファイルを開く', errorTitle: 'ファイルを開けませんでした。', errorMessage: '別の winmail.dat ファイルを試すか、トラブルシューティングを確認してください。', tryAgain: '再試行', privacyNote: 'ファイルはこのページ上でローカルに読み込まれます。', readPrivacy: 'プライバシーに関する説明', proofEyebrow: 'このツールを使う理由', proofTitle: '複雑な添付ファイルをシンプルに。', proof: [{ title: '最初からプライベート', body: 'ファイルの内容は最初から最後までブラウザ内に留まります。' }, { title: 'わかりやすい復元', body: '添付ファイル、サイズ、ダウンロード可能な状態を確認できます。' }, { title: 'どこでも使える', body: 'パソコン、タブレット、スマートフォンで使えます。' }], howEyebrow: '使い方', howTitle: '本来の添付ファイルを取り戻す 3 ステップ。', steps: [{ title: 'ファイルを選ぶ', body: 'メールから winmail.dat を見つけ、上のエリアにドロップします。' }, { title: 'ローカルで展開', body: 'TNEF コンテナをブラウザ内で展開します。アップロードはありません。' }, { title: '必要なものを保存', body: '添付ファイルを個別に保存するか、ZIP にまとめます。' }], faqEyebrow: 'よくある質問', faqTitle: '.dat ファイルの疑問を解消します。', faq: [{ question: 'winmail.dat とは何ですか？', answer: 'Outlook はメールの書式や添付ファイルを winmail.dat という TNEF コンテナにまとめることがあります。' }, { question: 'ファイルはアップロードされますか？', answer: 'いいえ。端末のブラウザ API で読み込みます。' }, { question: 'エラーが出た場合は？', answer: '元の .dat 添付ファイルであることと、150 MB 未満であることを確認してください。' }, { question: 'スマートフォンで使えますか？', answer: 'はい。メールやファイルアプリのファイル選択機能を使ってください。' }], runtime: { problem: '問題を解決してください。', unsupportedTitle: 'TNEF ファイルではないようです。', unsupportedMessage: 'winmail.dat または ATT0001.dat を選択して、もう一度お試しください。', tooLargeTitle: 'ファイルが 150 MB を超えています。', tooLargeMessage: 'プライバシーと性能のため、150 MB まで対応しています。', reading: 'ファイルをローカルで読み込んでいます…', searching: '添付ファイルを探しています…', noAttachmentsTitle: '添付ファイルが見つかりません。', noAttachmentsMessage: '書式情報やインライン画像だけが含まれている可能性があります。', partialOne: '1 件の添付ファイルを復元できませんでした。以下のファイルはダウンロードできます。', partialMany: '{count} 件の添付ファイルを復元できませんでした。以下のファイルはダウンロードできます。', done: '完了しました。ファイルをダウンロードできます。', decodeTitle: 'ファイルを解析できませんでした。', decodeMessage: '添付ファイルをもう一度ダウンロードしてお試しください。', zipTitle: 'ZIP を作成できませんでした。', zipMessage: 'ファイルを個別にダウンロードしてください。', download: 'ダウンロード', downloadAria: '{name} をダウンロード', recoveredOne: '1 件のファイルを復元しました', recoveredMany: '{count} 件のファイルを復元しました' } },
		shared: { homeAria: 'Winmail.dat Opener ホーム', mainNav: 'メインナビゲーション', privacy: 'プライバシー', contact: 'お問い合わせ', free: '無料で利用できます。', localeMenu: '言語', selectLanguage: '言語を選択', menuButton: 'ナビゲーションメニューを開く', mobileMenu: 'モバイルナビゲーション' },
		pages: {
			faq: { eyebrow: 'FAQ', title: '始める前に知っておきたいこと。', lead: 'Outlook の winmail.dat とブラウザデコーダーについての実用的な情報です。', items: [{ question: 'なぜ winmail.dat が届くのですか？', answer: 'Outlook は書式、予定、添付ファイルを TNEF でまとめることがあります。' }, { question: 'ATT0001.dat に対応していますか？', answer: 'はい。TNEF 添付ファイルでよく使われる別名です。' }, { question: 'ファイルはアップロードされますか？', answer: 'いいえ。ブラウザ内で読み込みと復元を行います。' }, { question: 'どのサイズまで使えますか？', answer: '最大 150 MB の DAT ファイルに対応しています。' }, { question: '添付ファイルが見つからないのはなぜですか？', answer: 'ファイルが不完全か、書式情報のみを含んでいる可能性があります。' }, { question: 'まとめてダウンロードできますか？', answer: 'はい。すべてダウンロードでブラウザ内に ZIP を作成できます。' }] },
			how: { eyebrow: '使い方', title: 'ファイルで起こること。', lead: 'Winmail.dat Opener は TNEF コンテナから実際の添付ファイルを取り出すためのブラウザツールです。', steps: [{ title: 'ファイルを選択', body: 'ファイル選択または `.dat` のドロップを使います。' }, { title: 'ブラウザで読み込み', body: 'ブラウザ API でメモリ上に読み込み、TNEF を解析します。' }, { title: '結果を保存', body: '復元されたファイルをローカルのダウンロードリンクから保存できます。' }], calloutEyebrow: 'プライバシー', calloutTitle: 'ファイルを端末外へ送る必要はありません。', calloutBody: '選択したファイルはローカルで処理され、Winmail.dat Opener や他のサービスへ送信されません。' },
			privacy: { eyebrow: 'プライバシー', title: 'ファイルはあなたのもとに留まります。', lead: 'デコーダーの動作と、収集する必要のない情報について説明します。', sections: [{ title: 'ローカル処理', body: 'ファイルは端末のメモリ上で読み込みと復元を行います。アップロードされません。' }, { title: 'サイトが受け取る可能性のある情報', body: 'ページ、スクリプト、スタイルなどの通常のウェブリクエスト情報をホスティング事業者が受け取る場合があります。' }, { title: '一時的なブラウザデータ', body: '復元ファイルには一時的なオブジェクト URL を使い、リセットまたはページ離脱時に無効化します。' }, { title: '第三者サービス', body: '初回リリースでは広告ピクセル、解析スクリプト、第三者アップロードサービスを使用しません。' }, { title: 'お問い合わせ', body: 'プライバシーや復元についてはお問い合わせページをご利用ください。' }], contactLink: 'お問い合わせページ' },
			contact: { eyebrow: 'お問い合わせ', title: '困ったことを教えてください。', lead: 'フィードバックはデコーダーの改善に役立ちます。ブラウザ、ファイルサイズ、エラーメッセージを記載してください。', calloutEyebrow: 'メールでのフィードバック', calloutBody: '問題が起きた手順と、ファイル名が winmail.dat か ATT0001.dat かを記載してください。', calloutNote: 'メールで問い合わせる' },
		},
	}),
};

export const getTranslations = (locale: Locale): Translation => translations[locale];
