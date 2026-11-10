import { useState, type ChangeEvent, type FormEvent, type FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./navbar";

interface EventForm {
  title: string;
  date: string;
  totalSeats: string;
  price: string;
  description: string;
  photo: File | null;
}

type FormErrors = Partial<Record<keyof EventForm, string>>;

const initialForm: EventForm = {
  title: "",
  date: "",
  totalSeats: "",
  price: "",
  description: "",
  photo: null,
};

const CreateEvent: FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<EventForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const nextErrors: FormErrors = {};
    const seats = Number(form.totalSeats);
    const price = Number(form.price);

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    else if (form.title.trim().length > 25) {
      nextErrors.title = "Title must be 25 characters or fewer.";
    }

    if (!form.date) nextErrors.date = "Date is required.";
    if (!form.totalSeats || !Number.isInteger(seats) || seats < 0) {
      nextErrors.totalSeats = "Enter a whole number of 0 or more.";
    }
    if (form.price === "" || !Number.isFinite(price) || price < 0) {
      nextErrors.price = "Enter a valid price of 0 or more.";
    }
    if (form.description.trim().length < 10 || form.description.trim().length > 250) {
      nextErrors.description = "Description must be 10–250 characters.";
    }
    if (!form.photo) nextErrors.photo = "Event photo is required.";

    return nextErrors;
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({
      ...current,
      photo: event.target.files?.[0] ?? null,
    }));
    setErrors((current) => ({ ...current, photo: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fill the form completely.");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title.trim());
    payload.append("date", form.date);
    payload.append("totalSeats", form.totalSeats);
    payload.append("price", form.price);
    payload.append("description", form.description.trim());
    if (form.photo) payload.append("photo", form.photo);

    setSaving(true);
    try {
      await axios.post("http://localhost:5000/api/event/create", payload);
      toast.success("Event created successfully!");
      navigate("/event");
    } catch (error) {
      console.error("Create event failed:", error);
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? String(error.response.data.message)
          : "Failed to create event. Please try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: Exclude<keyof EventForm, "photo">, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const inputClass =
    "h-[25px] w-full rounded-[4px] border border-[#a8b2c1] bg-white px-2 text-[12px] text-slate-800 outline-none focus:border-blue-600";
  const labelClass = "mb-[1px] block text-[14px] font-semibold text-slate-800";

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <Navbar />

      <main className="flex min-h-[calc(100vh-40px)] items-center justify-center px-4 py-6 sm:px-6">
        <div className="w-full max-w-[334px]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full rounded-[6px] border border-[#a8b2c1] bg-white px-6 py-[10px]"
          >
            <h1 className="mb-[13px] text-center text-[20px] font-bold text-slate-800 tracking-tight">
              Create Event (admin only)
            </h1>

            <div className="mb-[10px]">
              <label className={labelClass} htmlFor="event-title">Title</label>
              <input
                id="event-title"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.title)}
              />
              {errors.title && <p className="mt-1 text-[11px] text-red-600">{errors.title}</p>}
            </div>

            <div className="mb-[17px]">
              <label className={labelClass} htmlFor="event-date">Date</label>
              <input
                id="event-date"
                type="date"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.date)}
              />
              {errors.date && <p className="mt-1 text-[11px] text-red-600">{errors.date}</p>}
            </div>

            <div className="mb-[17px]">
              <label className={labelClass} htmlFor="event-seats">Total seats</label>
              <input
                id="event-seats"
                type="number"
                min="0"
                step="1"
                value={form.totalSeats}
                onChange={(event) => updateField("totalSeats", event.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.totalSeats)}
              />
              {errors.totalSeats && <p className="mt-1 text-[11px] text-red-600">{errors.totalSeats}</p>}
            </div>

            <div className="mb-[17px]">
              <label className={labelClass} htmlFor="event-price">Price (Rs.)</label>
              <input
                id="event-price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                className={inputClass}
                aria-invalid={Boolean(errors.price)}
              />
              {errors.price && <p className="mt-1 text-[11px] text-red-600">{errors.price}</p>}
            </div>

            <div className="mb-[17px]">
              <label className={labelClass} htmlFor="event-description">Description</label>
              <textarea
                id="event-description"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                maxLength={250}
                rows={3}
                className="w-full rounded-[4px] border border-[#a8b2c1] bg-white px-2 py-1 text-[12px] text-slate-800 outline-none focus:border-blue-600"
                aria-invalid={Boolean(errors.description)}
              />
              {errors.description && <p className="mt-1 text-[11px] text-red-600">{errors.description}</p>}
            </div>

            <div className="mb-6">
              <label className={labelClass} htmlFor="event-photo">Event photo</label>
              <input
                id="event-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full text-[11px] text-slate-700 file:mr-2 file:rounded file:border-0 file:bg-slate-100 file:px-2 file:py-1"
                aria-invalid={Boolean(errors.photo)}
              />
              {errors.photo && <p className="mt-1 text-[11px] text-red-600">{errors.photo}</p>}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="h-[31px] w-full rounded-[4px] bg-[#304bd5] text-[12px] font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Event"}
            </button>
          </form>

        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
