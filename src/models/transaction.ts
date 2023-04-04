import Event from "./event";
import Participant from "./participant";

class Transaction {
  id: number;
  status: string;
  event: Event;
  participant: Participant[];
}

export default Transaction;
