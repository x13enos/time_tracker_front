export default async function ({ app }) {
    const locale = localStorage.getItem('locale') || 'en';
    app.i18n.locale = locale
}
