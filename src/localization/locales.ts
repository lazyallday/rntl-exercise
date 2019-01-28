import HeaderBarLocale, { HeaderBarLocaleType } from './HeaderBarLocale';

export interface Locales {
    header: string,
    noDocError: string,
    databaseError: string,
    auth: {
        shopError: string,
        userError: string,
        logOut: string,
    },
    notFound: {
        error: string,
        backHome: string,
    },
    login: {
        error: string,
        email: string,
        password: string,
        btn: string,
        login: string,
    },
    reports: {
        getReport: string,
        print: string,
    },
    headerBar: HeaderBarLocaleType,
}

const FI_LOCALE: Locales = {
    header: 'Rentle FI',
    databaseError: 'Palvelinyhteyttä ei juuri nyt voi valitettavasti muodostaa',
    noDocError: 'Palvelinvirhe: tietoa ei löydy',
    auth: {
        userError: 'Virhe käyttäjätietojen haussa. Onko verkkoyhteys kunnossa?',
        shopError: 'Virhe kaupan tietojen haussa. Päivitä sivu tai yritä myöhemmin uudelleen.',
        logOut: 'Kirjaudu ulos',
    },
    notFound: {
        error: 'Valitettavasti sivua ei löydy',
        backHome: 'Mene takaisin',
    },
    login: {
        error: 'Kirjautuminen epäonnistui',
        email: 'Sähköposti',
        password: 'Salasana',
        btn: 'Kirjaudu',
        login: 'Kirjaudu sisään',
    },
    reports: {
        getReport: 'Hae raportti',
        print: 'Tulosta',
    },
    headerBar: HeaderBarLocale.fi,
};

const EN_LOCALE: Locales = {
    header: 'Rentle ENG',
    noDocError: 'Server error: item is not found',
    databaseError: 'Cannot connect to the server error right now',
    auth: {
        shopError: 'Error getting shop information. Please refresh the page or try again later',
        userError: 'Error getting user information. Is your internet connection ok?',
        logOut: 'Log out',
    },
    notFound: {
        error: 'Sorry, the page cannot be found',
        backHome: 'Go back',
    },
    login: {
        error: 'Login failed',
        email: 'Email',
        password: 'Password',
        btn: 'Login',
        login: 'Login',
    },
    reports: {
        getReport: 'Get report',
        print: 'Print',
    },
    headerBar: HeaderBarLocale.en,
};

export default {
    fi: FI_LOCALE,
    en: EN_LOCALE,
};