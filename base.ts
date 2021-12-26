import { msg } from '@lit/localize';
import moment from 'moment';

const columns = {
  name: msg(`Name`),
  description: msg(`Beschreibung`),
  probability: msg(`Eintrittswahrscheinlichkeit`),
  number_domains: msg(`Informationsdomänen`),
  number_informations: msg(`Informationen`),
  unassessed_informations: msg(`Nicht beurteilte Informationen`),
  number_assessments: msg(`Beurteilungen`),
  last_assessment: msg(`Letzte Beurteilung`),
};

const titles = {
  edit: msg(`Bearbeiten`),
};

const dynMessages: { [key: string]: string } = {
  ...columns,
  ...titles,
};

const dynMsg = (key: string) => {
  const message = dynMessages[key];
  if (!message) {
    // eslint-disable-next-line no-console
    console.warn(`Dynamic message not found: ${key}`);
    return key;
  }

  return message;
};

const formatDate = (timestamp?: number): string =>
  timestamp ? moment(timestamp).format('DD.MM.YYYY') : '';

export { dynMsg, formatDate };
