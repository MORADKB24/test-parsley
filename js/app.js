$(function () {
  $('.demo-form').parsley().on('form:validate', function (formInstance) {
    var ok = formInstance.isValid({group: 'block1', force: true}) || formInstance.isValid({
        group: 'block2',
        force: true
      }) || formInstance.isValid({group: 'block3', force: true}) || formInstance.isValid({
        group: 'block4',
        force: true
      }) || formInstance.isValid({group: 'block5', force: true}) || formInstance.isValid({
        group: 'block6',
        force: true
      }) || formInstance.isValid({group: 'block7', force: true});
    $('.invalid-form-error-message')
      .html(ok ? '' : '<p>Vous n\'avez pas remplis tout les champs</p>')
      .toggleClass('filled', !ok);
    if (!ok)
      formInstance.validationResult = false;
  });
});