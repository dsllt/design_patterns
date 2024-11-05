import Location from '../../../../src/gof/creational/factory_method/Location'
import {
  DistanceRide,
  TimeRide,
} from '../../../../src/gof/creational/factory_method/Ride'
import Segment, {
  DistanceSegment,
  TimeSegment,
} from '../../../../src/gof/creational/factory_method/Segment'

test('Deve criar uma corrida e calcular a tarifa por distância', () => {
  const startingLocation = new Location(
    -27.584905257808835,
    -48.545022195325124,
    new Date('2024-10-31T10:00:00')
  )
  const endLocation = new Location(
    -27.496887588317275,
    -48.522234807851476,
    new Date('2024-10-31T12:00:00')
  )
  const ride = DistanceRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date('2024-10-31T10:00:00')
  )
  const segment = new DistanceSegment(
    ride.rideId,
    startingLocation,
    endLocation
  )
  ride.updateLocation(endLocation)
  const fare = ride.calculateFare([segment])

  expect(fare).toBe(40)
})

test('Deve criar uma corrida e calcular a tarifa por tempo', () => {
  const startingLocation = new Location(
    -27.584905257808835,
    -48.545022195325124,
    new Date('2024-10-31T10:00:00')
  )
  const endLocation = new Location(
    -27.496887588317275,
    -48.522234807851476,
    new Date('2024-10-31T12:00:00')
  )
  const ride = TimeRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date('2024-10-31T10:00:00')
  )
  const segment = new TimeSegment(ride.rideId, startingLocation, endLocation)
  ride.updateLocation(endLocation)
  const fare = ride.calculateFare([segment])

  expect(fare).toBe(120)
})
