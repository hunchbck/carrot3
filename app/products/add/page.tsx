'use client';

import { PhotoIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/button';
import Input from '@/components/input';

import { getUploadUrl, uploadProduct } from './actions';
import { ProductProps, productSchema } from './schema';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<ProductProps>({
    resolver: zodResolver(productSchema),
  });
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      console.log('파일이 아니네');
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    const { result, success } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue('photo', `https://imagedelivery.net/nwxXMmJxUUiN7Xi9SKXUwA/${id}`);
    }
  };
  const onSubmit = handleSubmit(async (data: ProductProps) => {
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append('file', file);
    const response = await fetch(uploadUrl, {
      body: cloudflareForm,
      method: 'post',
    });
    if (response.status !== 200) {
      console.log('response.status가 200이 아니네');
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price + '');
    formData.append('description', data.description);
    formData.append('photo', data.photo);
    const errors = await uploadProduct(formData);
    if (errors) {
      // setError("")
    }
  });
  const onValid = async () => {
    await onSubmit();
  };
  // console.log(register('title'));
  return (
    <div>
      <form action={onValid} className="flex flex-col gap-5 p-5">
        <label
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-cover bg-center text-neutral-300"
          htmlFor="photo"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-sm text-neutral-400">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          accept="image/*"
          className="hidden"
          id="photo"
          name="photo"
          type="file"
          onChange={onImageChange}
        />
        <Input
          required
          {...register('title')}
          errors={[errors.title?.message ?? '']}
          placeholder="제목"
          type="text"
        />
        <Input
          required
          {...register('price')}
          errors={[errors.price?.message ?? '']}
          placeholder="가격"
          type="number"
        />
        <Input
          required
          {...register('description')}
          errors={[errors.description?.message ?? '']}
          placeholder="자세한 설명"
          type="text"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
