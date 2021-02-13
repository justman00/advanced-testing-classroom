// shortid
import { v1 } from 'uuid';

export const createUser = ({ name, age }) => ({ name, age, id: v1() });
