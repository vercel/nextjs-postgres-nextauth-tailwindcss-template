'use client'

import React, { ReactNode, useMemo, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import styles from './storeTextEditorGroup.module.css'
import ReactQuill, { Quill, ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { ImageResize } from 'quill-image-resize-module-ts'

Quill.register('modules/ImageResize', ImageResize);

type Props = {
  label: ReactNode,
  placeholder?: string,
  data: string,
  setData: (data: string) => void,
}

const toolbarOptions = [
  ["image"],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", 'blockquote'],
  [{ list: "ordered" }, { list: "bullet" }, 'link', { indent: '-1' }, { indent: '+1' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
]

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "width",
];

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const { default: ImageCompress } = await import('quill-image-compress');

    // Quill에 모듈 등록
    QuillComponent.Quill.register('modules/imageCompress', ImageCompress);

    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );

    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false },
);

const StoreTextareaGroup = ({
  label,
  placeholder,
  data,
  setData
}: Props) => {
  const quillInstance = useRef<ReactQuill>(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file: File | null = input.files ? input.files[0] : null;
      if (!file) return;
      const { name } = file;
      const imageFile = URL.createObjectURL(file)
      const editor = quillInstance.current?.getEditor();
      const range = editor?.getSelection() ?? false;
      if (!range) return;

      // const { path } = await uploadFile(mediaForm);
      editor?.insertEmbed(range.index, 'image', imageFile);
      editor?.setSelection({
        index: range.index + 1,
        length: range.length + 1,
      });
    });
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
          container: toolbarOptions,
          handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }
  }, [])

  console.log("data", data)
  return (
    <>
      <Box className={styles.container}>
        <Typography className={styles.label}>
          {label}
        </Typography>
        <Box className={styles.textEditor}>
          <QuillNoSSRWrapper
            forwardedRef={quillInstance}
            onChange={setData}
            value={data}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            theme="snow"
            style={{
              height: 'calc(100% - 42px)'
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default StoreTextareaGroup
