
import { actions } from '../../src/store/index'

const context = {
  commit: (name, state) => {}
}

const successRepository = {
  get: (url, params) => new Promise((resolve, reject) =>
    url.includes('/credits')
      ? resolve({
        data: {
          cast: [ {
            name: 'John Travolta'
          }],
          crew: [{
            name: 'Quentin Tarantino',
            job: 'Director'
          }]
        }
      })
      : resolve({
        data: {
          title: 'Pulp fiction',
          vote_average: 8,
          homepage: 'http://imdb.com'
        }
      })
  )
}

const failRepository = {
  get: (url, params) => new Promise((resolve, reject) => reject(new Error('Error message')))
}

test('Getting the right movie object', () => {
  return actions(successRepository).fetchMovieById(context)
    .then(data => {
      expect(data).toMatchObject({
        title: 'Pulp fiction',
        vote_average: 8,
        homepage: 'http://imdb.com',
        credits: {
          cast: [{
            name: 'John Travolta'
          }],
          crew: [{
            name: 'Quentin Tarantino',
            job: 'Director'
          }]
        }
      })
    })
})

test('Request fails', () => {
  return actions(failRepository).fetchMovies(context)
    .catch(error => {
      expect(error).toBeInstanceOf(Error)
    })
})
