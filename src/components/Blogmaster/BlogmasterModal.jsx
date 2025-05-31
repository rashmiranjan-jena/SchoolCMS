import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogmasterModal = () => {
  const [formData, setFormData] = useState({
    blog_title: "",
    blog_content: "",
    blog_qoute: "",
    blog_tag_id: "",
    blog_image: null,
    blog_display_image: null,
    author_name: "",
    author_image: null,
    author_designation: "",
    author_description: "",
    blog_creation_date: "", 
    blog_category_id: "", 
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]); 
  const [tags, setTags] = useState([]); 
  const blogImageRef = useRef(null);
  const insideImageRef = useRef(null);
  const authorImageRef = useRef(null);
  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoryResponse = await axios.get(`${process.env.REACT_APP_BASE}/api/blog-category/`);
        setCategories(categoryResponse.data || []);

        const tagResponse = await axios.get(`${process.env.REACT_APP_BASE}/api/blog-tags/`);
        setTags(tagResponse.data || []);
      } catch (error) {
        toast.error("Error fetching categories or tags");
      }
    };

    fetchCategoriesAndTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.blog_title) formErrors.blog_title = "Blog title is required.";
    if (!formData.blog_content)
      formErrors.blog_content = "Blog content is required.";
    if (!formData.blog_qoute) formErrors.blog_qoute = "Blog quote is required.";
    if (!formData.blog_tag_id) formErrors.blog_tag_id = "Blog tag is required.";
    if (!formData.blog_image) formErrors.blog_image = "Blog image is required.";
    if (!formData.blog_display_image)
      formErrors.blog_display_image = "Block display image is required.";
    if (!formData.author_name)
      formErrors.author_name = "Author name is required.";
    if (!formData.author_image)
      formErrors.author_image = "Author image is required.";
    if (!formData.author_designation)
      formErrors.author_designation = "Author designation is required.";
    if (!formData.author_description)
      formErrors.author_description = "Author description is required.";
    if (!formData.blog_creation_date)
      formErrors.blog_creation_date = "Blog creation date is required."; // Validation for new field
    if (!formData.blog_category_id)
      formErrors.blog_category_id = "Blog category is required."; // Validation for new field

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE}/api/blog-master/`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Check if response status is 201 (created)
      if (response.status === 201) {
        toast.success("Blog saved successfully!");
        resetForm();
      } else {
        toast.error("Error saving blog: Unexpected response status.");
      }
    } catch (error) {
      toast.error(
        "Error saving blog: " +
          (error.response?.data?.message || "Something went wrong.")
      );
    }
  };
  

  const resetForm = () => {
    setFormData({
      blog_title: "",
      blog_content: "",
      blog_qoute: "",
      blog_tag_id: "",
      blog_image: null,
      blog_display_image: null,
      author_name: "",
      author_image: null,
      author_designation: "",
      author_description: "",
      blog_creation_date: "", // Reset new field
      blog_category_id: "", // Reset new field
    });
    setErrors({});
    if (blogImageRef.current) blogImageRef.current.value = "";
    if (insideImageRef.current) insideImageRef.current.value = "";
    if (authorImageRef.current) authorImageRef.current.value = "";
  };

  return (
    <div id="add_user" className="modal custom-modal fade" role="dialog">
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Blog Master</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Existing Fields */}
              {/* Blog Title */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="blog_title"
                  value={formData.blog_title}
                  onChange={handleChange}
                  required
                />
                {errors.blog_title && (
                  <div className="text-danger">{errors.blog_title}</div>
                )}
              </div>

              {/* Blog Content */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Content <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="blog_content"
                  value={formData.blog_content}
                  onChange={handleChange}
                  required
                />
                {errors.blog_content && (
                  <div className="text-danger">{errors.blog_content}</div>
                )}
              </div>

              {/* Blog Quote */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Quote <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="blog_qoute"
                  value={formData.blog_qoute}
                  onChange={handleChange}
                  required
                />
                {errors.blog_qoute && (
                  <div className="text-danger">{errors.blog_qoute}</div>
                )}
              </div>

              {/* Blog Tag Dropdown */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Tag <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="blog_tag_id"
                  value={formData.blog_tag_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Tag</option>
                  {tags?.length > 0 ? (
                    tags.map((tag) => (
                      <option key={tag.id} value={tag.blog_tag_id}>
                        {tag.tag_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading tags...</option>
                  )}
                </select>
                {errors.blog_tag_id && (
                  <div className="text-danger">{errors.blog_tag_id}</div>
                )}
              </div>


              
              {/* Blog Category Dropdown */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Category <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="blog_category_id"
                  value={formData.blog_category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.length > 0 ? (
                    categories.map((category) => (
                      <option key={category.id} value={category.blog_category_id}>
                        {category.category_name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading categories...</option>
                  )}
                </select>
                {errors.blog_category && (
                  <div className="text-danger">{errors.blog_category}</div>
                )}
              </div>

              {/* Blog Image */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="blog_image"
                  ref={blogImageRef}
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
                {errors.blog_image && (
                  <div className="text-danger">{errors.blog_image}</div>
                )}
              </div>

              {/* Block Display Image */}
              <div className="mb-3">
                <label className="form-label">
                  Block Display Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="blog_display_image"
                  ref={insideImageRef}
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
                {errors.blog_display_image && (
                  <div className="text-danger">
                    {errors.blog_display_image}
                  </div>
                )}
              </div>

              {/* Author Name */}
              <div className="mb-3">
                <label className="form-label">
                  Author Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  required
                />
                {errors.author_name && (
                  <div className="text-danger">{errors.author_name}</div>
                )}
              </div>

              {/* Author Image */}
              <div className="mb-3">
                <label className="form-label">
                  Author Image <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="author_image"
                  ref={authorImageRef}
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
                {errors.author_image && (
                  <div className="text-danger">{errors.author_image}</div>
                )}
              </div>

              {/* Author Designation */}
              <div className="mb-3">
                <label className="form-label">
                  Author Designation <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="author_designation"
                  value={formData.author_designation}
                  onChange={handleChange}
                  required
                />
                {errors.author_designation && (
                  <div className="text-danger">{errors.author_designation}</div>
                )}
              </div>

              {/* Author Description */}
              <div className="mb-3">
                <label className="form-label">
                  Author Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="author_description"
                  value={formData.author_description}
                  onChange={handleChange}
                  required
                />
                {errors.author_description && (
                  <div className="text-danger">{errors.author_description}</div>
                )}
              </div>

              {/* Blog Creation Date */}
              <div className="mb-3">
                <label className="form-label">
                  Blog Creation Date <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="blog_creation_date"
                  value={formData.blog_creation_date}
                  onChange={handleChange}
                  required
                />
                {errors.blog_creation_date && (
                  <div className="text-danger">{errors.blog_creation_date}</div>
                )}
              </div>


              {/* Submit Button */}
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Save Blog
                </button>
              </div>
            </form>
          </div>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
};

export default BlogmasterModal;
