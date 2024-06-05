import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          required
          errors={[]}
          placeholder="Phone number"
          type="number"
        />
        <FormInput
          required
          errors={[]}
          placeholder="Verification code"
          type="number"
        />
        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}
