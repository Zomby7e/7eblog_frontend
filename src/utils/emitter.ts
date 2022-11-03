import mitt, { Emitter } from 'mitt'

type Events = {
  onSavingArticle: null;
  closeModalWindow: null;
};

const emitter: Emitter<Events> = mitt<Events>()
export default emitter
