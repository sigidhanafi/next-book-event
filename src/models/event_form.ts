class EventForm {
  name: string;
  location: string;
  date: string;

  constructor(name: string, location: string, date: string) {
    this.name = name;
    this.location = location;
    this.date = date;
  }
}

export default EventForm;
