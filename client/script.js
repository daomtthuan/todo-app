$(document).ready(() => {
  function addWork(work) {
    $('#table-work-body').html((index, oldHtml) => {
      return `
        <tr id="${work.work_id}" class="${work.work_status ? 'text-line-through text-muted' : ''}">
          <th scope="row"></th>
          <td id="${work.work_id}-name" class="align-middle">${work.work_name}</th>
          <td class="d-flex justify-content-around align-middle">
            <button id="button-done-${work.work_id}" class="btn btn-sm btn-info btn-action ${work.work_status ? 'd-none' : ''}">
              <i class="fas fa-check"></i>
            </button>
            <button id="button-unfinished-${work.work_id}" class="btn btn-sm btn-info btn-action ${work.work_status ? '' : 'd-none'}">
              <i class="fas fa-times"></i>
            </button>
            <button id="button-details-${work.work_id}" class="btn btn-sm btn-secondary btn-action" data-toggle="modal" data-target="#modal-details">
              <i class="fas fa-eye"></i>
            </button>
            <button id="button-edit-${work.work_id}" class="btn btn-sm btn-secondary btn-action" data-toggle="modal" data-target="#modal-edit">
              <i class="fas fa-edit"></i>
            </button>
            <button id="button-remove-${work.work_id}" class="btn btn-sm btn-danger btn-action">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
        ${oldHtml}
      `;
    });

    $('#table-work>tbody>tr').each(function (index) {
      $(this)
        .find('th[scope="row"]')
        .text(index + 1);
    });

    $(`#button-done-${work.work_id}`).ready(() => {
      $(`#button-done-${work.work_id}`).click(() => {
        $.ajax({
          type: 'POST',
          url: '/server/api/work/update.php',
          data: {
            id: work.work_id,
            name: work.work_name,
            content: work.work_content,
            status: 1,
          },
          success() {
            window.location.reload();
          },
        });
      });
    });

    $(`#button-unfinished-${work.work_id}`).ready(() => {
      $(`#button-unfinished-${work.work_id}`).click(() => {
        $.ajax({
          type: 'POST',
          url: '/server/api/work/update.php',
          data: {
            id: work.work_id,
            name: work.work_name,
            content: work.work_content,
            status: 0,
          },
          success() {
            window.location.reload();
          },
        });
      });
    });

    $(`#button-details-${work.work_id}`).ready(() => {
      $(`#button-details-${work.work_id}`).click(() => {
        $('#modal-details').on('show.bs.modal', () => {
          $('#modal-details-input-id').val(work.work_id);
          $('#modal-details-input-name').val(work.work_name);
          $('#modal-details-input-content').val(work.work_content);
        });
      });
    });

    $(`#button-edit-${work.work_id}`).ready(() => {
      $(`#button-edit-${work.work_id}`).click(() => {
        $('#modal-edit').on('show.bs.modal', () => {
          $('#modal-edit-input-name').val(work.work_name);
          $('#modal-edit-input-content').val(work.work_content);
          $('#modal-edit-button-edit').click(() => {
            $.ajax({
              type: 'POST',
              url: '/server/api/work/update.php',
              data: {
                id: work.work_id,
                name: $('#modal-edit-input-name').val(),
                content: $('#modal-edit-input-content').val(),
                status: work.work_status,
              },
              success() {
                window.location.reload();
              },
            });
          });
        });
      });
    });

    $(`#button-remove-${work.work_id}`).ready(() => {
      $(`#button-remove-${work.work_id}`).click(() => {
        $.ajax({
          type: 'POST',
          url: '/server/api/work/delete.php',
          data: {
            id: work.work_id,
          },
          success() {
            window.location.reload();
          },
        });
      });
    });
  }

  $.getJSON('/server/api/work', (works) => {
    works.forEach((work) => addWork(work));
  });

  $('#button-create').click(() => {
    $('#modal-create').on('show.bs.modal', function () {
      $('#modal-create-input-name').val('');
      $('#modal-create-input-content').val('');
    });
  });

  $('#modal-create-button-create').click(() => {
    $.ajax({
      type: 'POST',
      url: '/server/api/work/create.php',
      data: {
        name: $('#modal-create-input-name').val(),
        content: $('#modal-create-input-content').val(),
      },
      success(data) {
        addWork(JSON.parse(data)[0]);
        $('#modal-create-input-name').val('');
        $('#modal-create-input-content').val('');
      },
    });
  });
});
