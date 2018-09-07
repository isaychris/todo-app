$('document').ready(function () {
    $('form').submit(function () {
        console.log('submit clicked');

        $.ajax({
            type: 'post',
            url: 'add',
            data: {
                todo: $('form input').val()
            }
        });
    });

    $('button.remove').click(function () {
        console.log('remove clicked');
        if (confirm("Are you sure you want to delete?")) {
            let id = $(this).data('id');

            $.ajax({
                type: 'delete',
                url: `remove/${id}`,
                success: function (res) {
                    location.href = "/";
                }
            });
        }
    });

    $('button.edit').click(function () {
        console.log('edit clicked');
        let initial = $(this).parent().find('span').text();
        let todo = prompt("Rename the todo: ", initial);

        if (todo != null) {
            let id = $(this).data('id');

            $.ajax({
                type: 'put',
                url: `edit/${id}`,
                data: {
                    todo: todo
                },
                success: function (res) {
                    location.href = "/";
                }
            });
        }
    });
});