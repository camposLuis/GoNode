'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.put('users', 'UserController.update').validator('User/Update')
}).middleware(['auth'])
