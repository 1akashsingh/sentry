from rest_framework.request import Request

from sentry.types.activity import ActivityType

from .mail import ActivityMailDebugView


class DebugResolvedInReleaseEmailView(ActivityMailDebugView):
    def get_activity(self, request: Request, event):
        return {"type": ActivityType.SET_RESOLVED_IN_RELEASE.value, "data": {"version": "abcdef"}}


class DebugResolvedInReleaseUpcomingEmailView(ActivityMailDebugView):
    def get_activity(self, request: Request, event):
        return {"type": ActivityType.SET_RESOLVED_IN_RELEASE.value, "data": {"version": ""}}
