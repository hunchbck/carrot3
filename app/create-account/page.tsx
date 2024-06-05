import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput required errors={[]} placeholder="Username" type="text" />
        <FormInput required errors={[]} placeholder="Email" type="email" />
        <FormInput
          required
          errors={[]}
          placeholder="Password"
          type="password"
        />
        <FormInput
          required
          errors={[]}
          placeholder="Confirm Password"
          type="password"
        />
        <FormButton loading={false} text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
