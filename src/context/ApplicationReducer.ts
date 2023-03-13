import { INITIAL_STATE } from '../utils/constants';

const ApplicationReducer = (state: any = INITIAL_STATE, action: any) => {
  const { type, data } = action || {};
  switch (type) {
    //TODO: handle type
    case 'TEST':
      console.log(type + ' ' + data);
      break;
  }
  return state;
};

export { ApplicationReducer };
