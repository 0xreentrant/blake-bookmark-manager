"use client";
import { FileUpload } from "@ark-ui/react";
import { FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { uploadBookmarksFile } from "@/actions/upload";
import { useForm } from "react-hook-form";

export default function Upload() {
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState<File>();

  type FieldValues = {
    files: File[]
  }

  const handleUpload = (data: FieldValues) => {
    const formData = new FormData();
    const file = data.files[0];
    formData.append("file", file);
    uploadBookmarksFile(formData);
  };

  return (
    <div>
      <div className="flex flex-col w-full items-center">
        <div className="text-3xl font-semibold">Upload your bookmarks</div>
        <p className="text-md text-muted-foreground">
          Upload your exported bookmarks here
        </p>
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="w-full flex flex-col w-full items-center"
        >
          <FileUpload.Root
            maxFiles={1}
            className="w-full flex flex-col w-full items-center pt-6"
            onFileAccept={({ files }) => setFile(files[0])}
          >
            <FileUpload.Dropzone className="flex flex-col items-center gap-3 p-12 w-full max-w-[50%] border-dashed border-2 rounded-md">
              Drag your file here
              <FileUpload.Trigger asChild>
                <Button>Browse files</Button>
              </FileUpload.Trigger>
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup className="w-full max-w-[50%] pt-3">
              {/* @ts-ignore TODO: why is this getting an error? */}
              <FileUpload.Context>
                {({ acceptedFiles }) =>
                  acceptedFiles.map((file) => (
                    <FileUpload.Item
                      key={file.name}
                      file={file}
                      className="flex items-center justify-between gap-3 w-full  border-solid border-2 rounded-md p-4"
                    >
                      <FileUpload.ItemPreview type="image/*">
                        <FileUpload.ItemPreviewImage />
                      </FileUpload.ItemPreview>
                      <FileUpload.ItemPreview type=".*">
                        <FileIcon />
                      </FileUpload.ItemPreview>
                      <FileUpload.ItemName />
                      <FileUpload.ItemSizeText />
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
