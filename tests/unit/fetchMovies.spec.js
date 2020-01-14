import { actions } from '../../src/store/index'

const context = {
  commit: (name, state) => {}
}

const successRepository = {
  get: (url, params) => new Promise((resolve, reject) => resolve({
    data: {
      results: [
        'Pulp fiction',
        'The gladiator'
      ]
    }
  }))
}

const failRepository = {
  get: (url, params) => new Promise((resolve, reject) => reject(new Error('Error message')))
}

test('Getting the right results', () => {
  return actions(successRepository).fetchMovies(context)
    .then(data => {
      expect(data.results).toContain('Pulp fiction')
      expect(data.results).toHaveLength(2)
    })
})

test('Request fails', () => {
  return actions(failRepository).fetchMovies(context)
    .catch(error => {
      expect(error).toBeInstanceOf(Error)
    })
})
