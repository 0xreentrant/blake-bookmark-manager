"use client";
import { FileUpload } from "@ark-ui/react";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { uploadBookmarksFile } from "@/actions/upload";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { UserContext } from "@/components/UserContext";

export default function Upload() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState<File>();

  type FieldValues = {
    files: File[];
  };

  console.log({user});

  const handleUpload = (data: FieldValues) => {
    const formData = new FormData();
    const file = data.files[0];
    formData.append("file", file);
    uploadBookmarksFile(user.id, formData);
  };

  return (
    <div className="p-3">
      <div className="flex flex-col w-full items-start">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 lg:hidden" onClick={() => router.back()}>
            <ArrowLeft />
            <span className="underline">All bookmarks</span>
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold">
              Upload your bookmarks
            </h1>
            <p className="text-md text-muted-foreground">
              Upload your exported bookmarks here
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="w-full flex flex-col w-full items-center"
        >
          <FileUpload.Root
            maxFiles={1}
            className="w-full flex flex-col w-full items-center pt-6"
            onFileAccept={({ files }) => setFile(files[0])}
          >
            <FileUpload.Dropzone className="flex flex-col items-center gap-3 p-12 w-full max-w-[85%] lg:max-w-[65%] border-dashed border-2 rounded-md">
              Drag your file here
              <FileUpload.Trigger asChild>
                <Button>Browse files</Button>
              </FileUpload.Trigger>
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup className="w-full max-w-[85%] lg:max-w-[65%] pt-3">
              {/* @ts-ignore TODO: why is this getting an error? */}
              <FileUpload.Context>
                {({ acceptedFiles }) =>
                  acceptedFiles.map((file) => (
                    <FileUpload.Item
                      key={file.name}
                      file={file}
                      className="flex items-center justify-between gap-3 w-full  border-solid border-2 rounded-md p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <FileUpload.ItemPreview
                          type=".htm*"
                          className="hidden lg:block"
                        >
                          <FileIcon />
                        </FileUpload.ItemPreview>
                        <FileUpload.ItemName className="[overflow-wrap:anywhere] flex-wrap text-wrap text-sm md:text-base" />
                        <FileUpload.ItemSizeText className="hidden md:block" />
                      </div>
                      <FileUpload.ItemDeleteTrigger>
                        <X />
                      </FileUpload.ItemDeleteTrigger>
                    </FileUpload.Item>
                  ))
                }
              </FileUpload.Context>
            </FileUpload.ItemGroup>
            <FileUpload.HiddenInput {...register("files")} />
            {file && (
              <Button type="submit" className="mt-6">
                Submit
              </Button>
            )}
          </FileUpload.Root>
        </form>
      </div>
    </div>
  );
}
