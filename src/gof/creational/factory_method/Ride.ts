import crypto from 'crypto'
import Location from './Location'
import Segment, { DistanceSegment, TimeSegment } from './Segment'

export abstract class Ride {
  lastLocation: Location

  constructor(
    readonly rideId: string,
    readonly lat: number,
    readonly long: number,
    readonly date: Date
  ) {
    this.lastLocation = new Location(lat, long, date)
  }

  updateLocation(newLocation: Location) {
    this.lastLocation = newLocation
  }

  abstract calculateFare(segments: Segment[]): number
  abstract createSegment(from: Location, to: Location): Segment
}

export class DistanceRide extends Ride {
  createSegment(from: Location, to: Location): Segment {
    return new DistanceSegment(this.rideId, from, to)
  }

  calculateFare(segments: DistanceSegment[]): number {
    let total = 0
    for (const segment of segments) {
      total += segment.getDistance()
    }
    return total * 4
  }

  static create(lat: number, long: number, date: Date) {
    const rideId = crypto.randomUUID()
    return new DistanceRide(rideId, lat, long, date)
  }
}

export class TimeRide extends Ride {
  createSegment(from: Location, to: Location): Segment {
    return new TimeSegment(this.rideId, from, to)
  }

  calculateFare(segments: TimeSegment[]): number {
    let total = 0
    for (const segment of segments) {
      total += segment.getDiffInMinutes()
    }
    return total * 1
  }

  static create(lat: number, long: number, date: Date) {
    const rideId = crypto.randomUUID()
    return new TimeRide(rideId, lat, long, date)
  }
}
