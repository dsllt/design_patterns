import { CopyForm } from '../../../../src/gof/creational/prototype/CopyForm'
import { Form } from '../../../../src/gof/creational/prototype/Form'
import { FormRepositoryMemoty } from '../../../../src/gof/creational/prototype/FormRepository'

test('deve copiar um formulário', async () => {
  const formRepository = new FormRepositoryMemoty()
  const form = new Form('1', 'Marketing', 'Leads v1')
  form.addField('text', 'name')
  form.addField('text', 'email')
  formRepository.save(form)
  const copyForm = new CopyForm(formRepository)
  const input = {
    fromFormId: '1',
    newFormId: '2',
    newCategory: 'Marketing',
    newDescription: 'Leads v2',
  }

  await copyForm.execute(input)

  const newForm = await formRepository.getById('2')

  expect(newForm.category).toBe('Marketing')
  expect(newForm.description).toBe('Leads v2')
  expect(newForm.fields).toHaveLength(2)
  expect(newForm.fields.at(0)?.title).toBe('name')
  expect(newForm.fields.at(1)?.title).toBe('email')
})
