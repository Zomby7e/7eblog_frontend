import mitt, { Emitter } from 'mitt'

type Events = {
  saveArticle: null;
};

const emitter: Emitter<Events> = mitt<Events>()
export default emitter
