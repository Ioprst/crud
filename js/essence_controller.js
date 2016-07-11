EssenceController = function() {
    function t() {
        this.$body = $('body');
        this.$menu = $('#essence-menu');
        this.$actionsWrapper = $('#table-actions');
        this.$contentHeader = $('#essence-title');
        this.$contentTable = $('#table-content');
        this.$currentModal = null;
        this._bindEvents();
    }

    t.prototype._bindEvents = function() {
        var _this = this;

        this.$menu.on('click','li a', function(event) {
            _this._onMenuItemClick(this);
            return false;
        });

        this.$body.on('click', '#new-ess', function(event) {
            _this._onCreateButtonClick(this);
            return false;
        });

        this.$body.on('change', '.ess-form input.form-control', function(event) {
            _this._onChangeFormInput(this);
            return false;
        });

        this.$contentTable.on('click', '#edit-ess', function(event) {
            _this._onEditButtonClick(this);
            return false;
        });

        this.$body.on('click', '.save-ess', function(event) {
            _this._onSaveFormButtonClick(this);
            return false;
        });

        this.$contentTable.on('click', '.remove-ess', function(event) {
            _this._onRemoveButtonClick(this);
            return false;
        });

        this.$body.on('hidden.bs.modal', '.modal', function () {
            _this.destroyCurrentModal();
            return false;
        })

    }

    t.prototype._onMenuItemClick = function(item) {
        var menuItem = $(item).parent('li');
        if (menuItem.hasClass('active'))
            return false;

        this.$menu.find('li').removeClass('active');
        menuItem.addClass('active');
        var essenseName = $(item).data('ess');
        this.loadEssenceByName(essenseName);
    }

    t.prototype._onCreateButtonClick = function(item) {
        var title = 'Create ' + this.currentEssence.TITLE;
        this.model = new this.currentEssence;
        this._openModalForm(title, this.model.getFormHTML());
    }

    t.prototype._onChangeFormInput = function(input) {
        var formGroup = $(input).parent('.form-group');
        if (formGroup.hasClass('has-error')) {
            formGroup.removeClass('has-error');
            formGroup.find('.help-block').html('');
        }
    }

    t.prototype._onEditButtonClick = function(item) {
        var id = $(item).data('id')
        var title = 'Edit ' + this.currentEssence.TITLE;
        this.model =  this.currentEssence.getModel(id);
        this._openModalForm(title, this.model.getFormHTML());
    }

    t.prototype._openModalForm = function(title, content) {
        var modal = _bootstrapModalTeplate(title, content);
        this.$currentModal = $(modal);
        this.$currentModal.modal();
    }

    t.prototype._onSaveFormButtonClick = function(button) {
        var form = $('#ess-form');
        var data = form.serializeArray();

        this.model.save(data, {
            'success' : this._onSaveSuccess.bind(this),
            'error' : this._onSaveError.bind(this)
        });
        return false;
    };

    t.prototype._onSaveSuccess = function(model) {
        this.renderEssenceTable();
        this.destroyCurrentModal();
        this.model = null;
        $.jGrowl("Сохранено");
    };

    t.prototype._onSaveError = function(model, errors) {
        var form = $('#ess-form');

        if (!errors.length)
            return $.jGrowl("Не удалось сохранить форму");

        for (var i = 0; i < errors.length; i++) {
            var error =errors[i];
            form.find('#form-'+error['name']).addClass('has-error');
            form.find('#form-'+error['name']+' .help-block').html(error['message']);
        }
    };

    t.prototype._onRemoveSuccess = function(id) {
        $('tr[data-row='+id+']').remove();
        $.jGrowl("Запись удалена");
    };

    t.prototype._onRemoveError = function(model, errors) {
        $.jGrowl("Не удалось удалить запись");
    };

    t.prototype._onRemoveButtonClick = function(item) {
        var id = $(item).data('id');
        this.currentEssence.removeRecord(id, {
            'success' : this._onRemoveSuccess.bind(this),
            'error' : this._onRemoveError.bind(this)
        });
    }

    t.prototype.loadEssenceByName = function (essenseName) {
        var essence = this.getEssenceByName(essenseName);
        if (!essence)
            return;
        this.loadEssence(essence);
    }

    t.prototype.loadEssence = function(essence) {
        this.currentEssence = essence;
        this.setPageTitle(essence.TITLE);
        this.renderActions();
        this.renderEssenceTable();
    };

    t.prototype.setPageTitle = function(title) {
        this.$contentHeader.html(title);
        document.title = title;
    };

    t.prototype.renderActions = function() {
        if (this.$actionsWrapper.is(':hidden'))
            this.$actionsWrapper.show();
    };

    t.prototype.renderEssenceTable = function() {
        var tableHeader = this._generateTableHeader(this.currentEssence);
        var tableBody = this._generateTableBody(this.currentEssence);
        this.$contentTable.html(tableHeader + tableBody);
    };

    t.prototype._generateTableHeader = function(essence) {
        var essenceAttributeLabels = essence.getAttributeLabels();
        var thead  = '<thead><tr>';

        for (var i = 0; i < essenceAttributeLabels.length; i++) {
           thead += '<td>' + essenceAttributeLabels[i]['label'] + '</td>';
        }
        thead += '<td>Actions</td</tr></thead>';
        return thead;
    };

    t.prototype._generateTableBody = function(essence) {
        var tbody  = '<tbody>';
        var data = essence.findAll();
        var rows = '';
        for (record in data) {
            tbody += this._generateTableRow(data[record], record);
        }

        tbody += '</tbody>';
        return tbody;
    };

    t.prototype._generateTableRow = function(record, id) {
        var row = '<tr data-row="'+id+'">'
        for (key in record) {
            var attributeMap = this.currentEssence.getAttributeMap();
            var attributeParams = attributeMap[key];
            var value = record[key];
            if (attributeParams.dependClassName && record[key]) {
                var dependClass = window[attributeParams.dependClassName];
                var dependData = dependClass.find(record[key]);
                var value = dependData[dependClass.NAME_ATTRIBUTE];
            }
            row += '<td>' + value+'</td>';
        }
        row += this._generateTableRowActions(record, id);
        row += '</tr>';
        return row;
    };

    t.prototype._generateTableRowActions = function(record, id) {
        return '<td>'+
            '<a id="edit-ess" data-id="'+ id +'" class="btn btn-primary btn-sm" href="#">'+
                '<span class="glyphicon glyphicon-edit"></span> </a> '+
            '<a href="#" data-id="'+ id +'" class="btn btn-danger btn-sm remove-ess"><span class="glyphicon glyphicon-remove"></span></a>'+
            '</td>';
    };

    t.prototype.destroyCurrentModal = function() {
       this.$currentModal.remove();
       $('.modal-backdrop').remove();
       $('body').removeClass('modal-open');
    };

    t.prototype.getEssenceByName = function(essenceName) {
        var essence;
        switch (essenceName) {
            case 'person':
                essence = Person;
                break;
            case 'user':
                essence = User;
                break;
            case 'position':
                essence = Position;
                break;
            case 'departament':
                essence = Departament;
                break;
            case 'company':
                essence = Company;
        }
        return essence;
    };

    return t;
}()