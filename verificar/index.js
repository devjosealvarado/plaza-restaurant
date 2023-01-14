(async () => {
    const id = window.location.pathname.split('/')[2];
    const { data } = await axios.patch(`/api/users/${id}`)
    if (data) {
        window.location.pathname = '/login';
    }
})();