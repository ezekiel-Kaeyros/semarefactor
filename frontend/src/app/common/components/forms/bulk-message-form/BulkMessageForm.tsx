import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import photographIcon from '../../../../../../public/photograph.png';
import Image from 'next/image';
import AnimateClick from '../../../ui/animate-click/AnimateClick';
import { Button } from '../../../ui/button/Button';
import { Editor } from '@tinymce/tinymce-react';
import { APIKey } from '@/utils/constants';
import PreviewComp from './PreviewComp';
import InputField from '@/app/common/ui/forms/text-field/InputField';
import { toast, Toaster } from 'react-hot-toast';
import { useBolkMessage } from '@/app/hooks/useBulkMessage';
import { usePathname } from 'next/navigation';
import { useDebounce } from 'usehooks-ts';
import {
  addItemTableTemplete,
  refesh,
} from '@/redux/features/bulk-message-slice';
import { sessionImport } from '@/utils/importSession';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { postBulkMessageTemplate } from './action';
import { newSessionImport } from '@/utils/newImportSession';
import { newUploadToCloudinary } from '@/utils/newCloudinary';
import { getFileHandler } from '@/utils/getfile';
// import path from 'path';
// import toast, { Toaster } from 'react-hot-toast';

type ActivityFormValues = {
  name: string;
  language?: string;
  body_text?: string;
  footer_text: string;
  image_handle?: string;
  image_url?: string;
};
const Arraytype = ['jpg', 'jpeg', 'png'];
const BulkMessageForm: React.FC<{ modalHandler?: any }> = (props) => {
  const [valueText, setValueText] = useState<string>('');
  const [errorFile, setErrorFile] = useState(false);
  const [templateImage, setTemplateImage] = useState<File | any>();
  const debouncedValue = useDebounce<string>(valueText, 500);

  const pathname = usePathname();
  const urlSplit = pathname.split('/');
  const test = async () => {};

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm<ActivityFormValues>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { dispatch } = useBolkMessage();

  const [btnState, setBtnState] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const editorRef = useRef<null | HTMLDivElement>(null);
  let tagline: string = watch('footer_text');
  const debouncedValueFooter = useDebounce<string>(tagline, 500);
  const chatContainerRef = useRef<any>(null);
  // ;

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    getFileHandler('../../../../../../public');
  }, []);
  useEffect(() => {
    if (
      acceptedFiles &&
      acceptedFiles.length > 0 &&
      acceptedFiles[0].size <= 2000000 &&
      Arraytype.includes(
        acceptedFiles[0].type.split('/')[1].toLocaleLowerCase()
      )
    ) {
      setErrorFile(false);

      setTemplateImage(acceptedFiles[0]);
    }

    if (
      acceptedFiles &&
      acceptedFiles.length > 0 &&
      (acceptedFiles[0].size > 2000000 ||
        !Arraytype.includes(
          acceptedFiles[0].type.split('/')[1].toLocaleLowerCase()
        ))
    ) {
      setErrorFile(true);

      setTemplateImage(undefined);
    }

    if (debouncedValue) {
      setBtnState(true);
      // //console.log(
      //   'debounce',
      //   debouncedValue
      //     .toLocaleLowerCase()
      //     .replaceAll(/[ .*+?^${}()|[\]\\#@êâôûöïüäëÿ%·`òàùỳèç£&é"'èà/,;:!?./§><-]/g, '_')
      // );

      // // ;
    } else {
      setBtnState(false);
    }
  }, [acceptedFiles, debouncedValue]);

  const onSubmit: SubmitHandler<ActivityFormValues> = async (data) => {
    setIsLoad(true);
    // // ;
    // // ;

    try {
      const sessionImportKey = await newSessionImport(
        acceptedFiles[0].size.toString(),
        acceptedFiles[0],
        'https://bulkmessage.sem-a.com'
      );

      // // ;

      const imageTemplateUrl = await newUploadToCloudinary(
        acceptedFiles[0],
        'https://bulkmessage.sem-a.com'
      );
      // // ;

      const textBodyToSend = debouncedValue.replace(/(<([^>]+)>)/gi, '');
      // // ;
      //  // ;

      const payload = {
        name: data.name
          .trim()
          .toLocaleLowerCase()
          .replaceAll(
            /[ .*+?^${}()|[\]\\#@êâôûöïüäëÿ%·`òàùỳèç£&é"'èà/,;:!?./§><-]/gi,
            '_'
          ),
        // language: urlSplit[1].toLocaleLowerCase() == 'en' ? 'en' : 'fr',
        language: 'fr',
        body_text: textBodyToSend,
        footer_text: data.footer_text,
        image_handle: sessionImportKey,
        image_url: imageTemplateUrl?.data?.secure_url,
      };

      const response = await postBulkMessageTemplate(payload);
      // // ;
      dispatch(refesh(true));
      reset();
      setIsLoad(false);
      toast.success('template enregistré');
      setTimeout(() => {
        props.modalHandler();
      }, 1000);
    } catch (error) {
      // ;
      setIsLoad(false);
      toast.error('une erreur est survenue revenez plus tard');
    }
  };
  const getText = (e: any) => {
    setValueText(e.target.value);
  };

  return (
    <form
      className="flex flex-col gap-4 overflow-y-scroll no-scrollbar max-h-[78vh]"
      onSubmit={handleSubmit(onSubmit)}
      ref={chatContainerRef}
    >
      {/* no-scrollbar */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="" ref={editorRef}>
        <h1 className="text-[25px] font-bold">Create Template Message</h1>
      </div>

      <div className="flex flex-row gap-6 pl-1">
        <div className="flex flex-col w-[60%] gap-[2rem]">
          <div className="flex flex-row items-center gap-4">
            <InputField
              name="name"
              title="name"
              register={register('name', {
                required: true,
                pattern: /[a-zA-Z0-9,_]$/,
              })}
              placeholder="Template Message name"
              style="rounded-lg px-12 pr-16 py-4 dark:bg-botMessageBg2"
              labelTextStyle="font-bold"
              classes={'w-[50%] rounded-lg'}
            />
          </div>

          <div className="flex flex-col  w-full">
            <h1 className="text-[18px] font-bold">Media</h1>
            <p>Use images to stand out</p>

            <div className="flex justify-between items-ceter">
              <AnimateClick>
                <section className="border-white border-[2px] border-dotted w-fit rounded-3xl overflow-hidden cursor-pointer px-2">
                  <div
                    {...getRootProps({
                      className:
                        'dropzone flex flex-row items-center gap-[.5rem] py-[.5rem] px-[.5rem]',
                    })}
                  >
                    <input {...getInputProps()} />
                    <Image
                      src={photographIcon}
                      width={30}
                      alt="photographIcon"
                    />
                    <p className="text-[1.5rem]">Import Media</p>
                  </div>
                </section>
              </AnimateClick>
            </div>
            {errorFile && (
              <p className="text-[red] font-bold">
                only image must be uplaoded with type jpg, jpeg, png with size
                less than 2Mo
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-[18px] font-bold">Message Content</h1>
            <textarea
              name=""
              id=""
              onChange={getText}
              className="bg-white text-black h-[350px] overflow-y-auto px-5 py-5 rounded-xl"
            ></textarea>
            {/* <p>Make your message personal using variables like { variableToDisplay } and get more replies</p> */}
            {/* <Editor
              apiKey={APIKey}
              onInit={(evt, editor: any) => (editorRef.current = editor)}
              initialValue="This is the initial content of the editor."
              init={{
                height: 500,
                menubar: false,
                entity_encoding: 'raw',
                encoding: 'xml',
                inline: false,

                plugins: [
                  // 'a11ychecker',
                  'advlist',
                  // 'advcode',
                  // 'advtable',
                  'autolink',
                  // 'checklist',
                  // 'export',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  // 'powerpaste',
                  'fullscreen',
                  // 'formatpainter',
                  'insertdatetime',
                  'media',
                  'table',
                  'help',
                  'wordcount',
                ],
                toolbar: ' casechange blocks | bold italic | ',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; } a { font-weight: bold;color: green;}',
              }}
              onEditorChange={(text) => {
                setValueText(text);
              }}
            /> */}
          </div>

          <div className="my-2">
            <InputField
              name="Signature"
              title="Signature"
              register={register('footer_text', {
                required: true,
                maxLength: 60,
              })}
              placeholder="your satisfaction, our priority"
              style="rounded-lg px-12 pr-16 py-4 dark:bg-botMessageBg2"
              labelTextStyle="font-bold"
              classes={'w-[50%] rounded-lg'}
            />
          </div>
        </div>

        <div className="flex flex-col w-[38%] ">
          <h1 className="text-[20px] font-bold">Preview</h1>
          <PreviewComp
            ImgTemplate={
              templateImage ? URL.createObjectURL(templateImage) : ''
            }
            // ImgTemplate={photographIcon}
            textTemplate={debouncedValue}
            tagline={debouncedValueFooter}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant={
          isValid && btnState && !isLoad && templateImage
            ? 'mainColor'
            : 'disabled'
        }
        iconSize={30}
        // onClick={() => // }
        className="w-[15%] mt-8"
        disabled={
          isValid && btnState && !isLoad && templateImage ? false : true
        }
      >
        {isLoad ? 'loading.....' : 'Create'}
      </Button>
    </form>
  );
};

export default BulkMessageForm;
