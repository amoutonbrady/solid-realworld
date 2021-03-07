import { createResource } from "solid-js";
import { DataFn } from "solid-app-router";

import { useApi } from "../store/apiStore";
import { useStore } from "../store/globalStore";

const ProfileData: DataFn<{ username: string }> = (props) => {
  const api = useApi();
  const [store] = useStore();

  const isFavorites = () => props.location.includes("favorite");
  const isCurrentUser = () => store.user.username === props.params.username;

  const [profile] = createResource(
    () => props.params.username,
    api.profile.get
  );

  return {
    get isCurrentUser() {
      return isCurrentUser();
    },
    get isFavorites() {
      return isFavorites();
    },

    get profile() {
      return profile();
    },
  };
};

export default ProfileData;
