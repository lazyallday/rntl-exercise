export interface HeaderBarLocaleType {
    reports: string,
    rentle: string,
    language: string,
    logOut: string,
}

const FI_LOCALE: HeaderBarLocaleType = {
    reports: 'Raportit',
    rentle: 'Rentle',
    language: 'Kieli',
    logOut: 'Kirjaudu ulos',
};

const EN_LOCALE: HeaderBarLocaleType = {
    reports: 'Reports',
    rentle: 'Rentle',
    language: 'Language',
    logOut: 'Log out',
};

export default {
    fi: FI_LOCALE,
    en: EN_LOCALE,
};