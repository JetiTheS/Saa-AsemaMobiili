function fetchAurora() {
    fetch(`https://space.fmi.fi/MIRACLE/RWC/data/r_index_latest_fi.json`)
        .then(response => {
            if (!response.ok)
                throw new Error("Error in aurora fetch:" + response.statusText + response.status);

            return response.json()
        })
}
export { fetchAurora }
