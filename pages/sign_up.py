"""This module contains the SignUpPage class for interacting with the sign-up page."""
from enum import Enum
from utils import Config

class UserRole(Enum):
    """Enumeration for user roles."""
    STUDENT = "student"
    TEACHER = "teacher"


class SignUpPage:
    """Page Object Model for the sign-up page."""
    def __init__(self, page):
        self.page = page

        self.first_name_input = page.get_by_role("textbox", name="First name")
        self.middle_name_input = page.get_by_role("textbox", name="Middle name")
        self.last_name_input = page.get_by_role("textbox", name="Last name")

        self.email_input = page.get_by_role("textbox", name="Email")
        self.password_input = page.get_by_role("textbox", name="Password", exact=True)
        self.confirm_password_input = page.get_by_role("textbox", name="Confirm password")

        self.radio_student = page.get_by_role("radio", name="Student")
        self.radio_teacher = page.get_by_role("radio", name="Teacher")

        self.signup_button = page.get_by_role("button", name="Sign up")

        self.signin_link = page.get_by_role("link", name="Sign in")

        #error messages

    def navigate(self):
        """Navigates to URL/signup"""
        self.page.goto(Config.BASE_URL + 'signup')

    def fill_signup_form(self, first_name: str, last_name: str,
                         email: str, password: str, confirm_password: str,
                         role: UserRole, middle_name: str = ""):
        """Fills out the sign-up form.

        Args:
            first_name (str): The first name of the user.
            last_name (str): The last name of the user.
            email (str): The email address of the user.
            password (str): The password for the account.
            confirm_password (str): Confirmation of the password.
            role (UserRole): Role of user.
            middle_name (str, optional): The middle name of the user. Defaults to an empty string.
        """
        self.first_name_input.fill(first_name)
        self.middle_name_input.fill(middle_name)
        self.last_name_input.fill(last_name)
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.select_role(role)
        self.confirm_password_input.fill(confirm_password)

    def select_role(self, role: UserRole):
        """Selects the user role (Student or Teacher) using an Enum.

        Args:
            role (UserRole): The role to select (UserRole.STUDENT or UserRole.TEACHER).

        Raises:
            ValueError: If an invalid role is provided.
        """
        if role == UserRole.STUDENT:
            self.radio_student.check()
        elif role == UserRole.TEACHER:
            self.radio_teacher.check()
        else:
            raise ValueError("Invalid role: choose UserRole.STUDENT or UserRole.TEACHER")

    def submit_form(self):
        """Clicks the sign-up button to submit the form."""
        self.signup_button.click()
