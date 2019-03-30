'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.put('users', 'UserController.update').validator('User/Update')
  Route.post('events', 'EventController.store')
  Route.get('events', 'EventController.index')
  Route.get('events/date', 'EventController.datevent')
  Route.get('events/:id', 'EventController.show')
  Route.put('events/:id', 'EventController.update')
  Route.delete('events/:id', 'EventController.destroy')
}).middleware(['auth'])
