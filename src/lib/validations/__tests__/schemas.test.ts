import { InfoFormDataSchema } from '../schemas'

describe('Schemas', () => {
  describe('InfoFormDataSchema', () => {
    it('validates valid form data', () => {
      const validData = {
        ocoId: 123,
        informacao: 'Esta é uma informação válida com mais de 10 caracteres',
        data: '2023-01-15'
      }

      expect(() => InfoFormDataSchema.parse(validData)).not.toThrow()
    })

    it('rejects invalid ocoId', () => {
      const invalidData = {
        ocoId: 0,
        informacao: 'Informação válida com texto suficiente',
        data: '2023-01-15'
      }

      expect(() => InfoFormDataSchema.parse(invalidData)).toThrow()
    })

    it('rejects short informacao', () => {
      const invalidData = {
        ocoId: 123,
        informacao: 'Curto',
        data: '2023-01-15'
      }

      expect(() => InfoFormDataSchema.parse(invalidData)).toThrow()
    })

    it('rejects missing data', () => {
      const invalidData = {
        ocoId: 123,
        informacao: 'Informação válida com texto suficiente',
        data: ''
      }

      expect(() => InfoFormDataSchema.parse(invalidData)).toThrow()
    })
  })
})