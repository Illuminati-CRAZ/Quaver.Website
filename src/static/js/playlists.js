function submitForm() {
    $('#playlist_search input').each(function () {
        const input = $(this);
        if (input.val() === "") {
            input.prop('disabled', true);
        }
    });
    $('form').submit();
}

function initLazy() {
    new LazyLoad({
        elements_selector: ".lazy"
    });
    $('[data-toggle="tooltip"]').tooltip();
}

initLazy();

let page = 1;

document.addEventListener("DOMContentLoaded", function (event) {
    $('#searchPlayList').on('click', function () {
        event.preventDefault();
        submitForm();
    });

    $('#playlists input[name=search]').on('keypress', function (event) {
        if (event.which === 13) {
            event.preventDefault();
            submitForm();
        }
    });

    $('#more').on('click', function () {
        query['page'] = page;
        $.post(baseUrl() + '/playlists/load', query ,function(data) {
            $("#maps").append(data);
            initLazy();
        });
        page += 1;
    });
});