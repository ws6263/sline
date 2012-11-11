//
//  LocalNotification.m
//	Phonegap LocalNotification Plugin
//	Copyright (c) Greg Allen 2011 & 2012 Drew Dahlman
//	MIT Licensed

#import "LocalNotification.h"


@implementation LocalNotification

//   The old (deprecated) signature!!
- (void)addNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    NSMutableDictionary *repeatDict = [[NSMutableDictionary alloc] init];
    [repeatDict setObject:[NSNumber numberWithInt:NSDayCalendarUnit] forKey:@"daily"];
    [repeatDict setObject:[NSNumber numberWithInt:NSWeekCalendarUnit] forKey:@"weekly"];
    [repeatDict setObject:[NSNumber numberWithInt:NSMonthCalendarUnit] forKey:@"monthly"];
    [repeatDict setObject:[NSNumber numberWithInt:NSYearCalendarUnit] forKey:@"yearly"];
    [repeatDict setObject:[NSNumber numberWithInt:0] forKey:@""];

    // notif settings
	double timestamp = [[options objectForKey:@"date"] doubleValue];
	NSString *msg = [options objectForKey:@"message"];
	NSString *action = [options objectForKey:@"action"];
	NSString *notificationId = [options objectForKey:@"id"];
    NSString *sound = [options objectForKey:@"sound"];
    NSString *bg = [options objectForKey:@"background"];
    NSString *fg = [options objectForKey:@"foreground"];
    NSString *repeat = [options objectForKey:@"repeat"];
	NSInteger badge = [[options objectForKey:@"badge"] intValue];
    //hasAction은 원래 bool 값인데 int 형으로 형변환해서 값을따져서 집어넣음. 왜?? 이렇게 했지?
    bool hasAction = ([[options objectForKey:@"hasAction"] intValue] == 1)?YES:NO;
	
	NSDate *date = [NSDate dateWithTimeIntervalSince1970:timestamp];

    //시스템 내 UILocalNotification 생성.
    UILocalNotification *localnotif = [[UILocalNotification alloc]init];
	if (localnotif != nil)  //생성되었으면
	{
        //UIAlert 생성
		UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"알림"
														message:[NSString stringWithFormat:@"메시지 와땅~~!"]//,localnotif.alertBody]
													   delegate:nil
											  cancelButtonTitle:nil
											  otherButtonTitles:@"확인",nil];
		[alert show];
	}
    
    //실제 LocalNoti~ 를 생성한다!!
	UILocalNotification *notif = [[UILocalNotification alloc] init];
	notif.fireDate = date;
    notif.fireDate = [[NSDate date] addTimeInterval:5];
	notif.hasAction = hasAction;
	notif.timeZone = [NSTimeZone defaultTimeZone];
    notif.repeatInterval = [[repeatDict objectForKey: repeat] intValue];
	
	notif.alertBody = ([msg isEqualToString:@""])?nil:msg;
	notif.alertAction = action;
    
    notif.soundName = UILocalNotificationDefaultSoundName;  //default Sound
    notif.applicationIconBadgeNumber = badge;   //NSInteger형
	
	NSDictionary *userDict = [NSDictionary dictionaryWithObjectsAndKeys:notificationId,@"notificationId",bg,@"background",fg,@"foreground",nil];
    
    notif.userInfo = userDict;

	//[[UIApplication sharedApplication] scheduleLocalNotification:notif];  //시간을 조작하여 통지
    [[UIApplication sharedApplication] presentLocalNotificationNow:notif];  //바로 통지

	NSLog(@"Notification Set: %@ (ID: %@, Badge: %i, sound: %@,background: %@, foreground: %@)", date, notificationId, badge, sound,bg,fg);

}

- (void)cancelNotification:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
	NSString *notificationId = [arguments objectAtIndex:0];
	NSArray *notifications = [[UIApplication sharedApplication] scheduledLocalNotifications];
	for (UILocalNotification *notification in notifications) {
		NSString *notId = [notification.userInfo objectForKey:@"notificationId"];
		if ([notificationId isEqualToString:notId]) {
			NSLog(@"Notification Canceled: %@", notificationId);
			[[UIApplication sharedApplication] cancelLocalNotification:notification];
		}
	}
}

- (void)cancelAllNotifications:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
	NSLog(@"All Notifications cancelled");
	[[UIApplication sharedApplication] cancelAllLocalNotifications];
}



@end
