/* eslint-disable @typescript-eslint/no-explicit-any */
import { goto } from '$app/navigation';
import { signIn, signUp, signOut, forgetPassword, resetPassword } from './auth_client';

export const handleSignIn = async (email: string, password: string) => {
	await signIn.email(
		{
			email: email,
			password: password
		},
		{
			onError(context: any) {
				console.log(context);
			},
			onSuccess() {
				goto('/homepage');
			}
		}
	);
};

export const handleSignUp = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	await signUp.email({
		email: email,
		password: password,
		name: `${firstName} ${lastName}`,
		fetchOptions: {
			onError(context: any) {
				alert(context.error.message);
			},
			onSuccess() {
				goto('/homepage');
			}
		}
	});
};

export const handleSignOut = async () => {
	await signOut({
		fetchOptions: {
			onSuccess() {
				goto('/');
			},
			onError(context: any) {
				alert(context.error.message);
			}
		}
	});
};

export const handleForgetPassword = async (email: string) => {
	await forgetPassword(
		{
			email: email,
			redirectTo: '/auth/reset_password'
		},
		{
			onSuccess() {
				alert('Password reset link sent to your email');
				goto('/');
			},
			onError(context: any) {
				alert(context.error.message);
			}
		}
	);
};

export const handleResetPassword = async (password: string) => {
	await resetPassword({
		newPassword: password,
		fetchOptions: {
			onSuccess() {
				window.location.href = '/auth/sign_in';
			},
			onError(context: any) {
				alert(context.error.message);
			}
		}
	});
};
