"use client";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

interface FormInputs {
  name: string;
  email: string;

  images?: FileList;
}

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean | null;
    role: string;
    image: string | null
  }
}

export const ProfileForm = ({user}: Props) => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...user,
    },
  });

  const onSubmit = async (data: FormInputs) => {
    // const formData = new FormData();

    // const { images, ...productToSave } = data;

    // if (product.id) {
    //   formData.append("id", product.id ?? "");
    // }
    // formData.append("title", productToSave.title);
    // formData.append("slug", productToSave.slug);
    // formData.append("description", productToSave.description);
    // formData.append("price", productToSave.price.toString());
    // formData.append("inStock", productToSave.inStock.toString());
    // formData.append("sizes", productToSave.sizes.toString());
    // formData.append("tags", productToSave.tags);
    // formData.append("categoryId", productToSave.categoryId);
    // formData.append("gender", productToSave.gender);

    // if (images) {
    //   for (let i = 0; i < images.length; i++) {
    //     formData.append("images", images[i]);
    //   }
    // }

    // const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    // if (!ok) {
    //   alert("Producto no se pudo actualizar");
    //   return;
    // }
    // router.replace(`/admin/product/${updatedProduct?.slug}`);

    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Nombre</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("name", { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>email</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("email", { required: true, min: 0 })} />
        </div>

        {/* <div className="flex flex-col mb-2">
          <span>Foto</span>
          <input
            type="file"
            multiple
            className="p-2 border rounded-md bg-gray-200"
            accept="image/png, image/jpeg, image/avif"
          />
        </div> */}

        {/* <button className="btn-primary w-full">Guardar</button> */}
      </div>
    </form>
  );
};
