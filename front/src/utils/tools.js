import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import axios from "axios";

const uploadImageByURL = (event) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(event);
    } catch (error) {
      reject(error);
    }
  });
  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

const uploadImageByFile = async (file) => {
  console.log("file", file);
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axios.post("http://localhost:3000/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  let url = `http://localhost:3000/public/img/${data.key}`;

  if (data) {
    return {
      success: 1,
      file: { url },
    };
  }
};

export const tools = {
  embed: Embed,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  nestedlist: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  header: {
    class: Header,
    config: {
      levels: [1, 2, 3, 4],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};
