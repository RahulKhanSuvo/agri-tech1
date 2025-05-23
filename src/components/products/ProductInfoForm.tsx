import { productCategories } from "@/lib/productCategory";
import TagInput from "./TagInput";
import { TagsProps } from "@/types/type";

export default function ProductInfoForm({
  tags,
  setTags,
  register,
  errors,
}: TagsProps) {
  return (
    <div className="bg-white  rounded-2xl">
      <h3 className="font-semibold border-b px-6 py-4 ">Product Information</h3>
      <div className="space-y-2 px-6 pt-2 pb-6 text-gray-500 ">
        <label htmlFor="name" className="block  font-medium ">
          Product name <sup className="text-red-500">*</sup>
        </label>
        <input
          {...register("productName", {
            required: "Product name is required",
            maxLength: {
              value: 30,
              message: "Do not exceed 30 characters",
            },
          })}
          type="text"
          id="name"
          className="border rounded-xl px-6 py-3 w-full "
          placeholder="Enter product name"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.productName.message}
          </p>
        )}
        <div className="grid grid-cols-2 gap-6">
          {/* category */}
          <div>
            <label htmlFor="name" className="block  font-medium">
              Category <sup className="text-red-500">*</sup>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border mt-2 rounded-xl px-6 py-3 w-full "
              name="category"
              id="category"
            >
              <option value="">Choose category</option>
              {productCategories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          {/* stock */}
          <div>
            <label htmlFor="name" className="block  font-medium">
              Stock<sup className="text-red-500">*</sup>
            </label>
            <div className="flex mt-2 border rounded-xl">
              <input
                type="number"
                id="stock"
                {...register("stock", {
                  required: "Product stuck is required",
                })}
                className="focus:outline-none focus:ring-0 focus:border-none px-6 py-3 w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] "
                placeholder="Enter product stock"
              />
              <select
                {...register("unit", { required: "Please select a unit" })}
                className="focus:outline-none focus:ring-0 focus:border-none"
              >
                <option value="">Unit</option>
                <option value="kg">Kg</option>
                <option value="g">G</option>
                <option value="liter">Liter</option>
                <option value="ml">Ml</option>
                <option value="piece">Piece</option>
                <option value="bag">Bag</option>
                <option value="dozen">Dozen</option>
              </select>
            </div>
            {(errors.stock?.message || errors.unit?.message) && (
              <p className="text-red-500 text-sm mt-1">
                {(errors.stock?.message as string) ||
                  (errors.unit?.message as string)}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block  font-medium">
            Description<sup className="text-red-500">*</sup>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="border rounded-xl px-6 py-3 w-full h-52"
            name="description"
            id="description"
            placeholder="Short description about the product"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <label htmlFor="description" className="block  font-medium">
          Tags<sup className="text-red-500">*</sup>
        </label>
        <TagInput
          setTags={setTags}
          tags={tags}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
