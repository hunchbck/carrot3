'use client';

import { PhotoIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';

import Button from '@/components/button';
import Input from '@/components/input';

import { uploadProduct } from './actions';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div>
      <form action={action} className="flex flex-col gap-5 p-5">
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
                {state?.fieldErrors.photo}
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
          errors={state?.fieldErrors.title}
          name="title"
          placeholder="제목"
          type="text"
        />
        <Input
          required
          errors={state?.fieldErrors.price}
          name="price"
          placeholder="가격"
          type="number"
        />
        <Input
          required
          errors={state?.fieldErrors.description}
          name="description"
          placeholder="자세한 설명"
          type="text"
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
