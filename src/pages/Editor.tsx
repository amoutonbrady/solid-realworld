import { useRouter } from "solid-app-router";
import { Component, createSignal, JSX, Show } from "solid-js";

import Errors from "../components/Errors";
import { useApi } from "../store/apiStore";
import { prevent } from "../utils/preventDefault";
import { IArticle } from "../types/article.interface";

const Editor: Component<{
  isUpdate: boolean;
  article: IArticle;
}> = (props) => {
  const api = useApi();
  const [, { push }] = useRouter();
  const [errors, setErrors] = createSignal<Error | Record<string, string[]>>();

  const submit: JSX.EventHandlerUnion<HTMLFormElement, Event> = async (
    event
  ) => {
    const data = new FormData(event.currentTarget);
    const body = Object.fromEntries(data) as any;
    body.tagList = body.tagList.split(",").map((val: string) => val.trim());

    const res = props.isUpdate
      ? api.article.update(props.article.slug, body)
      : api.article.add(body);

    return res
      .then((article) => push(`/article/${article.slug}`))
      .catch(setErrors);
  };

  return (
    <div class="editor-page">
      <div class="container page">
        <Show when={errors()}>
          <Errors errors={errors()} />
        </Show>

        <div class="row">
          <div class="col-md-10 offset-md-1 col-xs-12">
            <Show when={!props.isUpdate || props.article}>
              <form onSubmit={prevent(submit)}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      name="title"
                      value={props.isUpdate ? props.article.title : ""}
                      placeholder="Article Title"
                    />
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="description"
                      value={props.isUpdate ? props.article.description : ""}
                      placeholder="What's this article about?"
                    />
                  </fieldset>

                  <fieldset class="form-group">
                    <textarea
                      class="form-control"
                      rows="8"
                      name="body"
                      placeholder="Write your article (in markdown)"
                    >
                      {props.isUpdate ? props.article.body : ""}
                    </textarea>
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="tagList"
                      value={
                        props.isUpdate ? props.article.tagList.join(", ") : ""
                      }
                      placeholder="Enter tags"
                    />
                    <div class="tag-list"></div>
                  </fieldset>

                  <button
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
