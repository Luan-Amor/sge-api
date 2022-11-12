import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto/event.dto';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

const eventList = [
  new Event({name: 'New Event', description: 'Description', 
  speaker: 'Orador', spots: 20, videos: null, ownerId: '1',
  ticketPrice: 150, endEventDate: new Date(), 
  startEventDate: new Date()}),
  new Event({name: 'old Event', description: 'Description', 
  speaker: 'Orador', spots: 20, videos: null, ownerId: '1',
  ticketPrice: 150, endEventDate: new Date(), 
  startEventDate: new Date()}),
  new Event({name: 'New Event', description: 'Description', 
  speaker: 'Orador', spots: 20, videos: null, ownerId: '2',
  ticketPrice: 150, endEventDate: new Date(), 
  startEventDate: new Date()}),
]


describe('EventsService', () => {
  let service: EventsService;
  let repository: Repository<Event>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService,
      {
        provide: getRepositoryToken(Event),
        useValue: {
          create: jest.fn().mockResolvedValue(eventList[0]),
          save: jest.fn().mockResolvedValue(eventList[0]),
          find: jest.fn().mockResolvedValue(eventList),
          findOne: jest.fn().mockResolvedValue(eventList[0]),
          merge: jest.fn(), 
          softDelete: jest.fn()
        }
      }],
    }).compile();

    service = module.get<EventsService>(EventsService);
    repository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("Create Event", () => {
    it('should create an event with success', async () => {
  
      const result = await service.create({name: 'New Event', description: 'Description', 
            speaker: 'Orador', spots: 20, videos: null, 
            ticketPrice: 150, endEventDate: new Date(), 
            startEventDate: new Date()}, '1');
  
      expect(result).toBeInstanceOf(EventDto)
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
      
    });
  })
  describe("Update Event", () => {
    it('should update event', async () => {
  
      const result = await service.update('1', 1, {name: 'New Event', description: 'Description', 
            speaker: 'Orador', spots: 20, videos: null, 
            ticketPrice: 150, endEventDate: new Date(), 
            startEventDate: new Date()});
  
      expect(result).toBeInstanceOf(EventDto)
      expect(repository.merge).toBeCalledTimes(1);
      expect(repository.save).toBeCalledTimes(1);
      
    });
    it('should throw an exception.', async () => {
  
      expect(() => service.update('2', 1, {name: 'New Event', description: 'Description', 
      speaker: 'Orador', spots: 20, videos: null, 
      ticketPrice: 150, endEventDate: new Date(), 
      startEventDate: new Date()})).rejects.toThrow()
      
    });
  })

  describe("Find All", () => {
    it('should return an event list', async () => {
  
      const result = await service.findAll();
  
      expect(result[0]).toBeInstanceOf(EventDto)
      expect(repository.find).toBeCalledTimes(1);      
    });
  })
  describe("Find one", () => {
    it('should return an event', async () => {
  
      const result = await service.findOne(1);
  
      expect(result).toBeInstanceOf(EventDto)
      expect(repository.findOne).toBeCalledTimes(1);      
    });
  })
  describe("Remove", () => {
    it('should remove an event', async () => {
      await service.remove('1',1);
      expect(repository.softDelete).toBeCalledTimes(1);      
    });
    it('should thow an exception', async () => {
      expect(async () => await service.remove('2',1)).rejects.toThrow();
    });
  })
  describe("Add Video", () => {
    it('should  add a video in event', async () => {
      await service.addVideo('1',1, {name: 'test', description: 'test', url: 'test', id: 1});
      expect(repository.save).toBeCalledTimes(1);      
    });
    it('should thow an exception', async () => {
      expect(async () => await service.addVideo('2',1,{name: 'test', description: 'test', url: 'test', id: 1})).rejects.toThrow();
    });
  })
});
