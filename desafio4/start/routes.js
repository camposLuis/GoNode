'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.put('users', 'UserController.update').validator('User/Update')
  Route.post('events', 'EventController.store').validator('Event')
  Route.get('events', 'EventController.index')
  Route.get('events/date', 'EventController.datevent')
  Route.get('events/:id', 'EventController.show')
  Route.put('events/:id', 'EventController.update').validator('Event')
  Route.delete('events/:id', 'EventController.destroy')

  Route.post('share/:id', 'ShareController.shareEvent').validator('Share')
}).middleware(['auth'])
