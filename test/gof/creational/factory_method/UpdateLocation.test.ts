import UpdateLocation from '../../../../src/gof/creational/factory_method/UpdateLocation'
import RideRepositoryMemory from '../../../../src/gof/creational/factory_method/RideRepository'
import SegmentRepositoryMemory from '../../../../src/gof/creational/factory_method/SegmentRepository'
import CalculateFare from '../../../../src/gof/creational/factory_method/CalculateFare'
import {
  DistanceRide,
  TimeRide,
} from '../../../../src/gof/creational/factory_method/Ride'

test('Deve atualizar a localização de uma corrida por distância', async () => {
  const rideRepository = new RideRepositoryMemory()
  const segmentRepository = new SegmentRepositoryMemory()
  const ride = DistanceRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date('2024-10-31T10:00:00')
  )
  await rideRepository.save(ride)
  const updateLocation = new UpdateLocation(rideRepository, segmentRepository)

  const input = {
    rideId: ride.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date('2024-10-31T12:00:00'),
  }

  await updateLocation.execute(input)
  const calculateFare = new CalculateFare(rideRepository, segmentRepository)
  const output = await calculateFare.execute(ride.rideId)
  expect(output.fare).toBe(40)
})

test('Deve atualizar a localização de uma corrida por tempo', async () => {
  const rideRepository = new RideRepositoryMemory()
  const segmentRepository = new SegmentRepositoryMemory()
  const ride = TimeRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date('2024-10-31T10:00:00')
  )
  await rideRepository.save(ride)
  const updateLocation = new UpdateLocation(rideRepository, segmentRepository)

  const input = {
    rideId: ride.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date('2024-10-31T12:00:00'),
  }

  await updateLocation.execute(input)
  const calculateFare = new CalculateFare(rideRepository, segmentRepository)
  const output = await calculateFare.execute(ride.rideId)
  expect(output.fare).toBe(120)
})
