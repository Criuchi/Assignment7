$(document).ready(function () {
    const characterTable = $('#character-table');
    const characterData = $('#character-data');
    const characterDataFile = 'characters.json';
    let sortColumn = null;
    let sortOrder = 1;

    function loadCharacterData() {
        $.getJSON(characterDataFile, function (data) {
            renderCharacterTable(data);
        });
    }

    function renderCharacterTable(data) {
        characterData.empty();
        data.forEach(function (character) {
            const row = $('<tr>');
            for (const key in character) {
                if (character.hasOwnProperty(key)) {
                    row.append('<td>' + character[key] + '</td>');
                }
            }
            characterData.append(row);
        });
    }


    function sortTable(column) {
        const rows = characterData.find('tr').toArray();
        const columnIndex = $(`[data-sort="${column}"]`).parent().index();
        rows.sort(function (a, b) {
            const aValue = $(a).find('td').eq(columnIndex).text();
            const bValue = $(b).find('td').eq(columnIndex).text();
            return sortOrder * (aValue > bValue ? 1 : -1);
        });

        characterData.empty();
        characterData.append(rows);
        updateChevron(column);
    }

    function updateChevron(column) {
        characterTable.find('th a').removeClass('sort-asc sort-desc');
        if (column === sortColumn) {
            sortOrder = -sortOrder;
            if (sortOrder === 1) {
                $(`[data-sort="${column}"]`).addClass('sort-asc');
            } else {
                $(`[data-sort="${column}"]`).addClass('sort-desc');
            }
        } else {
            sortColumn = column;
            sortOrder = 1;
            $(`[data-sort="${column}"]`).addClass('sort-asc');
        }
    }

     characterTable.on('click', 'th a', function () {
        const column = $(this).data('sort');
        sortTable(column);
    });

    loadCharacterData();
});
