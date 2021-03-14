import {useRef} from 'react';

type EventAgumentType<T> = (argv?: T) => void;

export const useDelayEventHandler = <T>(
  event: EventAgumentType<T>,
  {delayUntilRepeat}: {delayUntilRepeat: number},
): EventAgumentType<T> => {
  const shoudleFireEvent = useRef<boolean>(true);
  //
  const fireEvent = (argv?: T) => {
    if (delayUntilRepeat === -1) {
      event(argv);
      return;
    }
    if (shoudleFireEvent.current) {
      shoudleFireEvent.current = false;
      //
      event(argv);
      //
      setTimeout(() => {
        shoudleFireEvent.current = true;
      }, delayUntilRepeat);
    }
  };
  return fireEvent;
};

type EventConfig = {
  event: () => void;
  eventKey: string;
  delayUntilRepeat?: number;
};

export const useDelayEventHandlerEx = ({
  delayUntilRepeat,
}: {
  delayUntilRepeat: number;
}): ((eventConfig: EventConfig) => void) => {
  const shoudleFireEvents = useRef<Map<string, boolean>>(
    new Map<string, boolean>(),
  ).current;
  //

  const createEventKeyIfAny = (eventKey: string) => {
    if (!shoudleFireEvents.has(eventKey)) {
      shoudleFireEvents.set(eventKey, true);
    }
  };
  const fireEvent = (eventConfig: EventConfig) => {
    createEventKeyIfAny(eventConfig.eventKey);
    //
    const _delayUntilRepeat = eventConfig.delayUntilRepeat || delayUntilRepeat;
    if (_delayUntilRepeat === -1) {
      eventConfig.event();
      return;
    }
    //
    const shoudleFireEvent = shoudleFireEvents.get(eventConfig.eventKey);
    if (shoudleFireEvent) {
      shoudleFireEvents.set(eventConfig.eventKey, false);
      //
      eventConfig.event();
      //
      setTimeout(() => {
        shoudleFireEvents.set(eventConfig.eventKey, true);
      }, _delayUntilRepeat);
    }
  };
  return fireEvent;
};
