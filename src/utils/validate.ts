export function useValidate() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const numberRegex = /^\d+$/

  const required = [
    (v: string) => !!v || 'required',
    (v: string) => (v && v.length <= 255) || 'Name must be less than 255 characters'
  ]

  const email = [
    (v: string) => !!v || 'required',
    (v: string) => emailRegex.test(v) || 'Please enter a valid email address'
  ]

  const number = [
    (v: string) => !!v || 'required',
    (v: string) => numberRegex.test(v) || 'Please fill only numbers'
  ]

  return {
    required,
    email,
    number,
  }
}
