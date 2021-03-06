import { createState, createComputed, For } from 'solid-js';

import { useStore } from '../../store';
import ListErrors from '../../components/ListErrors';
import { useRouter } from 'solid-app-router';

export default (props) => {
  const [, { push }] = useRouter();
  const [store, { createArticle, updateArticle }] = useStore();
  const emptyArticle = {
    tagInput: '',
    tagList: [],
    inProgress: false,
    tagsInput: '',
    errors: null,
    title: '',
    description: '',
    body: '',
  };

  const [state, setState] = createState({ ...emptyArticle });

  const updateState = (field) => (ev) => setState(field, ev.target.value);
  const handleAddTag = () => {
    if (state.tagInput) {
      setState((s) => {
        s.tagList.push(s.tagInput.trim());
        s.tagInput = '';
      });
    }
  };
  const handleRemoveTag = (tag) => {
    !state.inProgress &&
      setState('tagList', (tags) => tags.filter((t) => t !== tag));
  };
  const handleTagInputKeyDown = (ev) => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        handleAddTag();
        break;
      default:
        break;
    }
  };
  const submitForm = (ev) => {
    ev.preventDefault();

    setState({ inProgress: true });
    const { inProgress, tagsInput, ...article } = state;

    (props.slug ? updateArticle : createArticle)(article)
      .then((article) => push(`/article/${article.slug}`))
      .catch((errors) => setState({ errors }))
      .finally(() => setState({ inProgress: false }));
  };

  createComputed(() => {
    const article = store.articles[props.slug];

    if (article) {
      setState(article);
    } else {
      setState({ ...emptyArticle });
    }
  });

  return (
    <div class="editor-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={state.errors} />

            <form>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    value={state.title}
                    onInput={updateState('title')}
                    disabled={state.inProgress}
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    value={state.description}
                    onInput={updateState('description')}
                    disabled={state.inProgress}
                  />
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={state.body}
                    onInput={updateState('body')}
                    disabled={state.inProgress}
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    value={state.tagInput}
                    onInput={updateState('tagInput')}
                    onBlur={handleAddTag}
                    onKeyUp={handleTagInputKeyDown}
                    disabled={state.inProgress}
                  />
                  <div class="tag-list">
                    <For each={state.tagList}>
                      {(tag) => (
                        <span class="tag-default tag-pill">
                          <i
                            class="ion-close-round"
                            onClick={[handleRemoveTag, tag]}
                          />
                          {tag}
                        </span>
                      )}
                    </For>
                  </div>
                </fieldset>

                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={state.inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
